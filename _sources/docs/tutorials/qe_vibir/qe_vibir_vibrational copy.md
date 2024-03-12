# Vibrational analysis

The vibrational analysis interface simply leverages the job parallelization feature of the MatSciToolkit so we have a more reliable (less chance of failure) and faster calculation.

```{note}
### Compatability

Currently, only Quantum Espresso is supported. The code is still in development and will be expanded to other codes in the future (as needed).
```

## Example files

A set of example files are provided in the `tutorial` folder of the [MatSciToolkit repository](https://github.com/kimrojas/MatSciToolKit/tree/main/tutorial). Specifically, the dipole moment calculation is demonstrated in the [`example_ase_vib_1`](https://github.com/kimrojas/MatSciToolKit/tree/main/tutorial/example_ase_vib_1) directory.


## Example files workflow
The workflow in the example is as follows:

1. (01 prefix) Generate the displaced structures with ID
2. (02 prefix) Distribute and run the displaced structures in parallel.
3. (03 prefix) Combine the results and save as ASE readable cache
4. (04 prefix) Post-process the data and plot the results

## Important parts in the input_data for DFT runs

Unlike in the dipole moment calculation where we needed to put specific parameters for the electric field. In this workflow, the code handles it for us so we only need to put the standard DFT parameters. This is handled this way because in multi-directional systems (say, 2D or 1D systems), we need to calculate the dipole moment in all directions (which means 2 or 3 dft runs) and combine them.

Instead of calling the `Espresso` class, we call the `DFTrunner` class which is a wrapper for the `Espresso` class like so: 

```python
import argparse
argparser = argparse.ArgumentParser()
argparser.add_argument("-i", "--id", type=int)
args = argparser.parse_args()

x = DFTrunner(
    system_id=args.id, # JOB array id -> displaced image id
    input_data=input_data, # No need for specific parameter for dipole moment
    pseudopotentials=pseudopotentials, 
    kpts=[12, 12, 1],
    dirname="dft_calc/SUFFIX",
    espresso_command="mpirun pw.x".split(),
)
```

here, we get the `id` based on the job array id `python 02_run_dft_calculation.py --id $SGE_TASK_ID` and use it to get the displaced structure. You may need to count the number of 









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



