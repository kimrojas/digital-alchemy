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
    (n_eval_ase / n_eval_catlearn),
    "times less number of function evaluations than " "the standard NEB algorithm.",
)

# Timings
print("\nTimings: ")
print("ASE NEB: ", aseneb_time_real, "seconds")
print("ML-NEB: ", catlearnneb_time_real, "seconds")


# Plot ASE NEB:
nebtools_ase = NEBTools(images_ase)

Sf_ase = nebtools_ase.get_fit()[2]
Ef_ase = nebtools_ase.get_fit()[3]

Ef_neb_ase, dE_neb_ase = nebtools_ase.get_barrier(fit=False)
nebtools_ase.plot_band()

plt.savefig("ASE-NEB.png")

# Plot ML-NEB predicted path and show images along the path:
plotneb(trajectory="ML-NEB.traj", view_path=False)
