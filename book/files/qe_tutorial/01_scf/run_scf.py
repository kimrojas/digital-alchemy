import os
import numpy as np
from ase.calculators.espresso import Espresso
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

# 3. SET CALCULATOR
calc = Espresso(
    kpts=kpts,
    pseudopotentials=pseudopotentials,
    input_data=input_data,
    label="DFT/espresso"
)
atm.set_calculator(calc)

# 4. RUN CALCULATION

energy = atm.get_potential_energy()  # -- Run the calculation (will return energy)
forces = atm.get_forces()  # -- get the forces

# 5. SAVE OUTPUT
print("Energy: ", energy, "eV")
print("Forces (min,max): ", np.linalg.norm(forces, axis=1).min(), np.linalg.norm(forces, axis=1).max())


