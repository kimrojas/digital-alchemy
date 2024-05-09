import os
import numpy as np
from pathlib import Path

from ase.io import read, write
from ase.optimize import LBFGS, LBFGSLineSearch
from ase.calculators.espresso import Espresso
from ase.constraints import FixAtoms
from ase.units import Bohr, Rydberg


# 1. INPUT STRUCTURE FILE
# 1.a - Read the input structure file
atm = read("pristine_vdw.vasp") # Read the input structure file
# 1.b - Apply artificial distortions
atm.rattle(stdev=0.0004, seed=0)  # -- Apply a small random displacement to the atoms


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
    label="DFT/espresso",
)
atm.set_calculator(calc)

# 4. RUN CALCULATION

fmax = 1e-4 * Rydberg / Bohr
opt = LBFGS(atm, logfile="opt.log", trajectory="opt.traj", restart="opt.pckl")
opt.run(fmax=fmax)


# 5. FINAL OUTPUT
write("relaxed.vasp", atm)


