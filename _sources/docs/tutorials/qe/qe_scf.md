# SCF calculation

## Introduction


In a simple self-consistent field (SCF) calculation, we get the (1) energy and (2) forces of the system. There are three (3) files that you need. 

|File | Description|
|---|---|
|SLURM script | Submits the job to the cluster with required resources and environment|
|Python script | Controls the workflow|
|Structure file | Contains the atomic positions and lattice vectors of your system|

In this example, we will perform a SCF calculation on a simple HB sheet system. The tutorial files associated in this example can by found here: [link to files](https://www.example.com)


## SLURM script

The SLURM script is responsible for submitting the job to the cluster with the required resources and environment. 


### Script content

```{warning}
Please note that you need to adapt the environment variables and paths according to your specific setup.
```

```bash
#!/bin/bash
#SBATCH --partition=i8cpu
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=128
#SBATCH --time=00:30:00
#SBATCH --job-name=calc
#SBATCH --array=0

# -- ENVIRONMENT --------------------------------------------------------------
source ~/.bashrc
module purge
module load oneapi_compiler/2023.0.0 oneapi_mkl/2023.0.0 oneapi_mpi/2023.0.0
module list

export FI_PROVIDER=psm3
ulimit -s unlimited

# Activate QE environment ------------------------------------------------------
# export PATH='/home/k0107/k010725/apps/qe/QE/src/qe-7.2/bin':$PATH
export PATH=$HOME/apps/qe/QE/src/qe-7.2/bin:$PATH
export ESPRESSO_PSEUDO=$HOME/apps/qe/QE/pseudo/gbrv/pbe
export ESPRESSO_TMPDIR=TMPDIR
export ESPRESSO_PROFILE='srun pw.x -nk 2'

# Activate Python environment --------------------------------
mamba activate qe_tutorial
echo "CONDA ENV: " $CONDA_PREFIX

# -- EXECUTION ----------------------------------------------------------------
echo "========= Job started  at `date` =========="

python run_scf.py

echo "========= Job finished at `date` =========="

```

### Explanation

Here is an explanation of the important parameters and environment settings used in the script:

- `#SBATCH --partition=i8cpu`
  : Specifies the partition on the cluster where the job will run. In this case, it is set to `i8cpu`.
- `#SBATCH --nodes=2`
  : Specifies the number of nodes requested for the job. In this case, it is set to `2`.

- `#SBATCH --ntasks-per-node=128`
  : Specifies the number of tasks per node. In this case, it is set to `128`.
- `#SBATCH --time=00:30:00`
  : Specifies the maximum time for the job to run. In this case, it is set to `30` minutes.
- `#SBATCH --job-name=calc`
  : Specifies the name of the job. In this case, it is set to `calc`.
- `#SBATCH --array=0`
  : Specifies the job array index. In this case, it is set to `0`.

The following **environment settings** are also important:

- `source ~/.bashrc`
  : Sources the `.bashrc` file to load any necessary environment variables.
- `module purge`
  : Removes all loaded modules from the environment.
- `module load oneapi_compiler/2023.0.0 oneapi_mkl/2023.0.0 oneapi_mpi/2023.0.0`
  : Loads the specified modules for the Intel oneAPI compiler, MKL, and MPI.

- `export FI_PROVIDER=psm3`
  : Sets the fabric interface provider to `psm3`.
- `ulimit -s unlimited`
  : Sets the stack size limit to unlimited.

The following **Quantum Espresso (QE) environment** settings are important for the job:

- `export PATH=$HOME/apps/qe/QE/src/qe-7.2/bin:$PATH`
  : Adds the QE binary directory to the `PATH` environment variable.
- `export ESPRESSO_PSEUDO=$HOME/apps/qe/QE/pseudo/gbrv/pbe`
  : Sets the path to the QE pseudopotential files.

- `export ESPRESSO_TMPDIR=TMPDIR`
  : Sets the temporary directory for QE.
- `export ESPRESSO_PROFILE='srun pw.x -nk 2'`
  : Sets the QE profile for parallel execution.


Finally, the script activates the **Python environment** and executes the `run_scf.py` script.


## Python workflow

The Python script controls the workflow of the SCF calculation. It sets up the input parameters, runs the calculation, and analyzes the results.

### Script content

```python
import os
import numpy as np
from ase.calculators.espresso import Espresso, EspressoProfile
from ase.io import read

# 1. INPUT STRUCTURE FILE
atm = read("pristine_vdw.vasp") # Read the input structure file

# 2. INPUT PARAMETERS
# 2.a - KPOINTS GRID
kpts = (4, 4, 1)

# 2.b - PSEUDOPOTENTIALS
pseudopotentials = { 
    "H": "h_pbe_v1.4.uspp.F.UPF",
    "N": "n_pbe_v1.2.uspp.F.UPF",
    "B": "b_pbe_v1.4.uspp.F.UPF",
}

# 2.c - PW PARAMETERS
input_data = {
    "control": {
        "tprnfor": True,  # -- Print forces
    },
    "system": {
        "ecutwfc": 60, 
        "ecutrho": 480,
        "occupations": "smearing",
        "smearing": "gaussian",
        "degauss": 0.01,
        "input_dft": "vdw-df2-b86r", # -- Use the rev-vdW-DF2 functional
    },
    "electrons": {
        "electron_maxstep": 100,
        "conv_thr": 1.0e-09,
        "mixing_beta": 0.7,
        "mixing_mode": "plain",
        "diagonalization": "rmm-davidson",
    },
}

# 3. CALCULATOR
calc = Espresso(
    kpts=kpts,
    pseudopotentials=pseudopotentials,
    input_data=input_data,
    directory="DFT",
    profile=EspressoProfile(argv=os.environ["ESPRESSO_PROFILE"].split()),
)
atm.set_calculator(calc)

# 4. RUN CALCULATION

energy = atm.get_potential_energy()  # -- Run the calculation (will return energy)
forces = atm.get_forces()  # -- get the forces

# 5. SAVE OUTPUT
print("Energy: ", energy, "eV")
print("Forces (min,max): ", np.linalg.norm(forces, axis=1).min(), np.linalg.norm(forces, axis=1).max())
```

### Explanation

| Step | Description |
|------|-------------|
| 1    | Read the input structure file named "pristine_vdw.vasp" using the `read` function from `ase.io` |
| 2    | Set up input parameters for the SCF calculation, including k-points grid, pseudopotentials, and various parameters for the electronic structure calculation |
| 3    | Create an instance of the `Espresso` calculator from `ase.calculators.espresso` and attach it to the atomic structure |
| 4    | Run the SCF calculation by calling the `get_potential_energy` method on the atomic structure |
|      | Calculate the forces on the atoms using the `get_forces` method |
| 5    | Print the energy and forces of the system |


## Structure file

The structure file contains the atomic positions and lattice vectors of your system. In this example, the structure file is named "pristine_vdw.vasp" and is in the VASP POSCAR format.

