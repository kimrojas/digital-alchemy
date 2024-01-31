from ase.calculators.espresso import Espresso
from ase.io import read, write
from ase.constraints import FixAtoms
from ase.neb import NEB
from ase.optimize import BFGS
import matplotlib.pyplot as plt
from catlearn.optimize.mlneb import MLNEB
from ase.neb import NEBTools
from catlearn.optimize.tools import plotneb

images = read("pathway.traj", ":")

## -----------------------------------------------------------------------------
pseudopotentials = {
    "Au": "au_pbe_v1.uspp.F.UPF",
    "Al": "al_pbe_v1.uspp.F.UPF",
}
input_data = {
    "control": {
        "tprnfor": True,
    },
    "system": {
        "ecutwfc": 50,
        "ecutrho": 400,
        "occupations": "smearing",
        "smearing": "gaussian",
        "degauss": 0.01,
    },
    "electrons": {
        "electron_maxstep": 100,
        "conv_thr": 1.0e-06,
        "mixing_beta": 0.5,
        "mixing_mode": "plain",
        "diagonalization": "david",
    },
}

def qecalc():
    return Espresso(
        pseudopotentials=pseudopotentials,
        input_data=input_data,
        kpts=(8,8, 1),
        label="qecalc/pwscf",
    )

## -----------------------------------------------------------------------------
# Set calculator:
for img in images:
    img.set_calculator(qecalc())

# no-CI calculation:
neb_ase_noci = NEB(images, method='improvedtangent')
qn_ase = BFGS(neb_ase_noci, trajectory='neb_ase_noci.traj')
qn_ase.run(fmax=0.05)

# CI calculation:
neb_ase_ci = NEB(images, method='improvedtangent', climb=True)
qn_ase = BFGS(neb_ase_ci, trajectory='neb_ase_ci.traj')
qn_ase.run(fmax=0.05)


write("neb_images.traj", images)


# Plot the pathway:
plotneb(trajectory='neb_images.traj', view_path=False)


