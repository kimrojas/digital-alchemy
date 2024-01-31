from ase.calculators.espresso import Espresso
from ase.io import read, write
from ase.constraints import FixAtoms
from ase.neb import NEB
from ase.optimize import BFGS
import matplotlib.pyplot as plt
from catlearn.optimize.mlneb import MLNEB
from ase.neb import NEBTools
from catlearn.optimize.tools import plotneb



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
        kpts=(4, 4, 1),
        label="qecalc/pwscf",
    )

## -----------------------------------------------------------------------------

images = read("pathway.traj", ":")
n_images = len(images)

# prepare inputfiles
# init 
initial = images[0]
initial.set_calculator(qecalc())
initial.get_potential_energy()
write("initial.traj", initial)

# final
final = images[-1]
final.set_calculator(qecalc())
final.get_potential_energy()
write("final.traj", final)

# intermediate images
write("intermediate.traj", images[1:-1])

neb_catlearn = MLNEB(start='initial.traj',
                     end='final.traj',
                     ase_calc=qecalc(),
                     n_images=n_images,
                     interpolation='intermediate.traj', restart=False)

neb_catlearn.run(fmax=0.05, trajectory='ML-NEB.traj')



# Plot the pathway:
plotneb(trajectory='ML-NEB.traj', view_path=False)


