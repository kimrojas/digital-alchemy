# SQUID: Example 01

The brief runthrough of the example is as follows:
1. File preparation
    - Python file
    - PBS job script file
2. Job submission
3. Analysis of the results

## File preparation

### **Python file**

First, let's create a python file called `catlearn-example-01-squid.py` with the following content:

```python
from ase.build import fcc100, add_adsorbate
from ase.calculators.emt import EMT
from ase.io import read
from ase.constraints import FixAtoms
from ase.neb import NEB
from ase.optimize import BFGS, MDMin
import matplotlib.pyplot as plt
from catlearn.optimize.mlneb import MLNEB
from ase.neb import NEBTools
from catlearn.optimize.tools import plotneb
from datetime import datetime
import time
import sys

""" 
    Toy model for the diffusion of a Au atom on an Al(111) surface.  
    This example contains: 
    1. Optimization of the initial and final end-points of the reaction path. 
    2.A. NEB optimization using CI-NEB as implemented in ASE. 
    2.B. NEB optimization using our machine-learning surrogate model.
    3. Comparison between the ASE NEB and our ML-NEB algorithm.
"""


# Calculator
def ase_calculator():
    return EMT()


# Timestamp
def timestamp():
    return datetime.now().strftime("[%Y-%m-%d %H:%M:%S]")


# Define number of images:
n_images = 7


# 1. Structural relaxation.

# 1.1. Structures: ###########################################################

# 2x2-Al(001) surface with 3 layers and an
# Au atom adsorbed in a hollow site:
print(f"{timestamp()} Creating initial structure: Al FCC(100) Slab + Au atom: ")
slab = fcc100("Al", size=(2, 2, 3))
add_adsorbate(slab, "Au", 1.7, "hollow")
slab.center(axis=2, vacuum=4.0)
slab.set_calculator(ase_calculator())

# Fix second and third layers:
print(f"{timestamp()} Applying constraints: Fixing slab second and third layers: ")
mask = [atom.tag > 1 for atom in slab]
slab.set_constraint(FixAtoms(mask=mask))

# 1.2. Optimize initial and final end-points. ################################

# Initial end-point:
print(f"{timestamp()} Optimizing initial end-point structure: ")
qn = BFGS(slab, trajectory="initial.traj")
qn.run(fmax=0.01)

# Final end-point:
print(f"{timestamp()} Creating final end-point structure: ")
slab[-1].x += slab.get_cell()[0, 0] / 2
print(f"{timestamp()} Optimizing final end-point structure: ")
qn = BFGS(slab, trajectory="final.traj")
qn.run(fmax=0.01)


# 2.A. NEB using ASE ########################################################

print(f"{timestamp()} Re-loading initial and final end-point structures: ")
initial_ase = read("initial.traj")
final_ase = read("final.traj")
constraint = FixAtoms(mask=[atom.tag > 1 for atom in initial_ase])

print(f"{timestamp()} Initializing NEB images state list: ")
images_ase = [initial_ase]
for i in range(1, n_images - 1):
    image = initial_ase.copy()
    image.set_calculator(ase_calculator())
    image.set_constraint(constraint)
    images_ase.append(image)

images_ase.append(final_ase)

print(f"{timestamp()} Initialize NEB instance: ")
neb_ase = NEB(images_ase, climb=True)

print(f"{timestamp()} Interpolating NEB images path:")
neb_ase.interpolate(method="linear")

print(f"{timestamp()} Optimizing NEB images path (ASE METHOD):")
aseneb_start_time_real = time.time()
qn_ase = MDMin(neb_ase, trajectory="neb_ase.traj", logfile="aseneb_opt.log")

aseneb_start_time_real = time.time()
qn_ase.run(fmax=0.05)
aseneb_end_time_real = time.time()
aseneb_time_real = aseneb_end_time_real - aseneb_start_time_real


# 2.B. NEB using CatLearn ####################################################
print(f"{timestamp()} Optimizing NEB images path (CatLearn METHOD):")

neb_catlearn = MLNEB(
    start="initial.traj",
    end="final.traj",
    ase_calc=ase_calculator(),
    n_images=n_images,
    interpolation="linear",
    restart=False,
)
catlearnneb_start_time_real = time.time()
neb_catlearn.run(
    fmax=0.05,
    trajectory="ML-NEB.traj",
    full_output=True,
)
catlearnneb_end_time_real = time.time()
catlearnneb_time_real = catlearnneb_end_time_real - catlearnneb_start_time_real

# 3. Summary of the results #################################################

# NEB ASE:
print("\nSummary of the results: \n")

atoms_ase = read("neb_ase.traj", ":")
n_eval_ase = int(len(atoms_ase) - 2 * (len(atoms_ase) / n_images))

print("Number of function evaluations CI-NEB implemented in ASE:", n_eval_ase)

# ML-NEB:
atoms_catlearn = read("evaluated_structures.traj", ":")
n_eval_catlearn = len(atoms_catlearn) - 2
print("Number of function evaluations CatLearn:", n_eval_catlearn)

# Comparison:
print(
    "\nThe ML-NEB algorithm required ",
    f"{(n_eval_ase / n_eval_catlearn):.2f}",
    "times less number of function evaluations than " "the standard NEB algorithm.",
)

# Timings
print("\nTimings: ")
print("\tASE-NEB: ", aseneb_time_real, "seconds")
print("\tML-NEB: ", catlearnneb_time_real, "seconds")


# Plot ASE NEB:
nebtools_ase = NEBTools(images_ase)

Ef_neb_ase, dE_neb_ase = nebtools_ase.get_barrier(fit=False)
nebtools_ase.plot_band()

plt.savefig("ASE-NEB.pdf")

# Plot ML-NEB predicted path and show images along the path:
plotneb(trajectory="ML-NEB.traj", view_path=False)

# Energy barrier and reaction path:
nebtools_catlearn = NEBTools(read(f"ML-NEB.traj@-{n_images}:"))
Ef_neb_catlearn, dE_neb_catlearn = nebtools_catlearn.get_barrier(fit=False)

print("\nEnergy barrier:")
print("\tASE-NEB: ", Ef_neb_ase, "eV")
print("\tML-NEB: ", Ef_neb_catlearn, "eV")
```

### **PBS job script file**

Create the PBS submission file `jobscript_squid.sh` with the following content:

```{hint} Adjusting the Job script

There are quite a few options that needs to be adjusted in the job script.

The most important ones are:
  - `#PBS -q DBG`: This option specifies the queue to which the job will be submitted. (choices: DBG, SQUID, SQUID-S, SQUID-H)
  - `#PBS --group=GROUP_NAME`: This option specifies the group to which the job will be submitted. (replace GROUP_NAME with your group name)

For more information, please visit the [SQUID documentation](http://www.hpc.cmc.osaka-u.ac.jp/en/system/manual/squid-use/beginner_squid/) 
```

```bash
#!/bin/bash
#------- qsub option -----------
#PBS -q DBG
#PBS -N calc
#PBS --group=K2319
#PBS -l elapstim_req=00:10:00
#PBS -l cpunum_job=4
#PBS -v OMP_NUM_THREADS=4
#PBS -T intmpi
#PBS -b 1

export LANG="en_US.utf8"
export PYTHONUNBUFFERED=1
cd $PBS_O_WORKDIR
exec 1<&- && exec 2<&-
exec 1<>${PBS_JOBNAME}_LOGFILE.log && exec 2>&1

# ------- Program execution -----------
module load BaseCPU/2023
source activate catlearn

echo "--------------ENVIRONMENT------------------"
echo "LANGUAGE:  " $LANG
echo "OMP_NUM_THREADS:  " $OMP_NUM_THREADS
echo "CONDA ENV:  " $CONDA_DEFAULT_ENV
echo "PYTHON:  " $(which python)
echo "PYTHON VERSION:  " $(python -V -V)
echo "LOCATION:  " $(pwd)
echo "-------------------------------------------"

echo "========= Job started  at `date` =========="
SCRIPT_FILE="catlearn-example-01.py"
mkdir -p run_dir && cd run_dir
time python ../$SCRIPT_FILE

echo "========= Job finished at `date` =========="
```


## Job submission

````{important}
Make sure that the Python file and the PBS job script file are in the same directory.

You can check using the `tree` command:
```bash
.
├── catlearn-example-01.py
└── jobscript_squid.sh

0 directories, 2 files
```
````



### **Submit the job** 

Submit the job using the following command:

```bash
qsub jobscript_squid.sh
```

### **Job status**

Check the job status using `qstat` and the output should be similar to:

```bash
RequestID       ReqName  UserName Queue     Pri STT S   Memory      CPU   Elapse R H M Jobs
--------------- -------- -------- -------- ---- --- - -------- -------- -------- - - - ----
640170.sqd      calc     u6b878   DBG-C       0 RUN -   11.08M     0.15        1 Y Y Y    1
```

## Analysis of results

### **File list**

When the run is completed, you should see the following files in the directory (via `tree` command):

```bash
.
├── calc.e640170
├── calc.o640170
├── calc_LOGFILE.log
├── catlearn-example-01.py
├── jobscript_squid.sh
└── run_dir
    ├── ASE-NEB.pdf
    ├── ML-NEB.traj
    ├── MLNEB.pdf
    ├── aseneb_opt.log
    ├── evaluated_structures.traj
    ├── final.traj
    ├── initial.traj
    ├── neb_ase.traj
    ├── results_neb.csv
    └── results_neb_interpolation.csv

1 directory, 15 files
```

### **Log file output**

The following are the important parts of the output. 
Note that some warnings are removed for clarity.

```
--------------ENVIRONMENT------------------
LANGUAGE:   en_US.utf8
OMP_NUM_THREADS:   4
CONDA ENV:   /sqfs/work/K2319/u6b878/apps/conda/conda_env/catlearn
PYTHON:   /sqfs/work/K2319/u6b878/apps/conda/conda_env/catlearn/bin/python
PYTHON VERSION:   Python 3.10.11 | packaged by conda-forge | (main, May 10 2023, 18:58:44) [GCC 11.3.0]
LOCATION:   /sqfs2/cmc/1/work/K2319/u6b878/test_workspace/digital-alchemy-test/catlearn-example-01
-------------------------------------------
========= Job started  at Mon Jun 12 19:17:02 JST 2023 ==========
[2023-06-12 19:17:22] Creating initial structure: Al FCC(100) Slab + Au atom: 
[2023-06-12 19:17:23] Applying constraints: Fixing slab second and third layers: 
[2023-06-12 19:17:23] Optimizing initial end-point structure: 
[2023-06-12 19:17:23] Creating final end-point structure: 
[2023-06-12 19:17:23] Optimizing final end-point structure:
[2023-06-12 19:17:24] Re-loading initial and final end-point structures: 
[2023-06-12 19:17:24] Initializing NEB images state list: 
[2023-06-12 19:17:24] Initialize NEB instance: 
[2023-06-12 19:17:24] Interpolating NEB images path:
[2023-06-12 19:17:24] Optimizing NEB images path (ASE METHOD):
[2023-06-12 19:17:24] Optimizing NEB images path (CatLearn METHOD):


Summary of the results: 

Number of function evaluations CI-NEB implemented in ASE: 50
Number of function evaluations CatLearn: 15

The ML-NEB algorithm required  3.33 times less number of function evaluations than the standard NEB algorithm.

Timings: 
	ASE-NEB:  0.45194172859191895 seconds
	ML-NEB:  14.536526679992676 seconds

Energy barrier:
	ASE-NEB:  0.3754668397431029 eV
	ML-NEB:  0.3684387991543643 eV

========= Job finished at Mon Jun 12 19:17:41 JST 2023 ==========
```


```{tip}
The reference output files are available in the [catlearn-example-01-squid](https://github.com/kimrojas/digital-alchemy/tree/main/book/files/catlearn/reference-output/catlearn-example-01-squid)
```

