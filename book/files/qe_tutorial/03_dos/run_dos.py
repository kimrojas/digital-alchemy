import os
import numpy as np
from pathlib import Path
from copy import deepcopy
from subprocess import run

from ase.io import read, write
from ase.optimize import LBFGS, LBFGSLineSearch
from ase.calculators.espresso import Espresso
from ase.constraints import FixAtoms
from ase.units import Bohr, Rydberg

cwd = Path("DFT")
cwd.mkdir(exist_ok=True)

# 1. INPUT STRUCTURE FILE
# 1.a - Read the input structure file
atm = read("pristine_vdw.vasp") # Read the input structure file

# 2. INPUT PARAMETERS
# 2.a - KPOINTS GRID
kpts_SCF = (4, 4, 1)
kpts_NSCF = (16, 16, 1)

# 2.b - PSEUDOPOTENTIALS
pseudopotentials = { 
    "H": "h_pbe_v1.4.uspp.F.UPF",
    "N": "n_pbe_v1.2.uspp.F.UPF",
    "B": "b_pbe_v1.4.uspp.F.UPF",
}

# 2.c - PW PARAMETERS
# 2.c.1 - SCF
input_data_scf = {
    "control": {
        "calculation": "scf",
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

# 2.c.2 - NSCF

input_data_nscf = deepcopy(input_data_scf)
input_data_nscf["control"]["calculation"] = "nscf"

# 3. RUN SCF CALCULATION
calc = Espresso(
    kpts=kpts_SCF,
    pseudopotentials=pseudopotentials,
    input_data=input_data_scf,
    label="DFT/espresso_scf",
)
atm.set_calculator(calc)
atm.calc.calculate(atm)

# 4. RUN NSCF CALCULATION
calc = Espresso(
    kpts=kpts_NSCF,
    pseudopotentials=pseudopotentials,
    input_data=input_data_nscf,
    label="DFT/espresso_nscf",
)
atm.set_calculator(calc)
atm.calc.calculate(atm)

# 5. RUN DOS CALCULATION
# 5.a Input file preparation
with open(cwd / "projwfc.inp", "w") as f:
    input_string = [
        "&projwfc",
        "  filpdos='base',",
        "  filproj='base.filproj',",
        "  Emin=-20.0, Emax=20.0, DeltaE=0.01,",
        "  ngauss = 0, degauss=0.01,"
        "/",
    ]
    f.write("\n".join(input_string))

# 5.b Run the DOS calculation
run("srun -n 64 projwfc.x < projwfc.inp > projwfc.out", shell=True, cwd=cwd)

    









# # 3. CALCULATOR
# calc = Espresso(
#     kpts=kpts,
#     pseudopotentials=pseudopotentials,
#     input_data=input_data,
#     label="DFT/espresso",
# )
# atm.set_calculator(calc)

# # 4. RUN CALCULATION

# fmax = 1e-4 * Rydberg / Bohr

# opt = LBFGS(atm, logfile="opt.log", trajectory="opt.traj", restart="opt.pckl")
# opt.run(fmax=fmax)


# # 5. FINAL OUTPUT
# write("relaxed.vasp", atm)


