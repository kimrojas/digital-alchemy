# Dipole moment calculation

The `get_dipole_moment` feature was recently added to the ASE-Espresso interface. Here is we detail how to use it. 

## Example files

A set of example files are provided in the `examples` folder of the [MatSciToolkit repository](https://github.com/kimrojas/MatSciToolKit/tree/main/tutorial). Specifically, the dipole moment calculation is demonstrated in the [`example_dipole_1`](https://github.com/kimrojas/MatSciToolKit/tree/main/tutorial/example_dipole_1) directory.


## Example files workflow
The workflow in the example is as follows:

1. (01 prefix) Relax the structure (no dipole moment yet parameters yet)
2. (02 prefix) Run the dipole moment calculation on the relaxed structure

## Important parts in the dipole moment input file

In the `02_get_dipolemoment.py` file, the most most important part is the `input_data` where we specifically set the `tefield`, `dipfield`, `edir`, `eamp`, `eopreg`, and `emaxpos` parameters. These are the parameters that are used to calculate the dipole moment. 

```python
input_data = {
    "control": {
        "tprnfor": True,
        "tefield": True, # Specific for dipole moment parameters
        "dipfield": True, # Specific for dipole moment parameters
    },
    "system": {
        "ecutwfc": 60,
        "ecutrho": 480,
        "occupations": "smearing",
        "smearing": "gaussian",
        "degauss": 0.01,
        "edir": 3, # Specific for dipole moment parameters
        "eamp": 0.00, # Specific for dipole moment parameters
        "eopreg": 0.0001, # Specific for dipole moment parameters
        "emaxpos": 0.0001 # Specific for dipole moment parameters
    },
    "electrons": {
        "conv_thr": 1.0e-06,
    },
}
```

In the example, we have a water molecule where we orient the dipole along z axis. The `edir` parameter is then set to 3, which corresponds to the z-axis. The `eamp` parameter is set to 0.00, since technically, we are not trying to induce any electric field. Lastly, `eopreg` and `emaxpos` are set to 0.0001, which is the region (in crystal coordinates) farthest from the atomic coordinates. 

## Example results

The resulting dipole moment is about -1.78 Debye, quite close to the expected value of -1.85 Debye. Here is a quick visualization.

```{image} https://raw.githubusercontent.com/kimrojas/MatSciToolKit/main/tutorial/reference/example_dipole_1/02_dipolemoment.png
:alt: waterdipolemoment
:class: bg-primary mb-1
:width: 600px
:align: center
```

```{note}
### Why is the sign different with VASP?

I honestly have no idea. However, this maybe due to convention. In VASP the dipole moment calculated is positive but in QE its negative. QE's dipole moment direction is more aligned with the physicists' convention (negative to the positive charge).

[more discussion](https://chemistry.stackexchange.com/q/44605)
```
