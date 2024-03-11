# Initial setup

## Installation

1. Create an environment

```bash
conda create --channel conda-forge --name mtkenv python=3.9
conda activate mtkenv
```

2. Install the required packages

```bash
# MatSciToolKit
pip install git+https://github.com/kimrojas/MatSciToolKit.git

# ASE package with dipole moment feature for quantum espresso
# -- This was the first version of ASE master that included the dipole moment feature.
#    More recent version should also work but have not been tested. 
pip install git+https://gitlab.com/ase/ase.git@f1b37b76dda641bcdd7dc3f41a5aa243659f4a99
```

3. Quantum espresso installation and Pseudopotentials

- QE installation details can be found in the [QE installation guide](https://kimrojas.github.io/digital-alchemy/docs/recipes/qe/qe-smith.html).
- Pseudopotentials used in tutorials come from the [GBRV library](https://www.physics.rutgers.edu/gbrv/).