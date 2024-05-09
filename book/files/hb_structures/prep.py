"""
Transforms the structure files to other formats.
"""
from pathlib import Path
import zipfile
from ase.io import read, write
from io import StringIO

structurezip = Path("crystal_structure.zip")

with zipfile.ZipFile(structurezip, 'r') as zip_ref:
    zip_ref.extractall("xsf")
    
    
files = list(Path("xsf").rglob("*.xsf"))

for fi in files:    
    with open(fi, "r") as f:
        lines = f.read().splitlines()
    
    with open(fi, "w") as f:
        lines = ["CRYSTAL"] + lines[8:]
        f.writelines("\n".join(lines))    
    
    atm = read(fi)
    atm.center(axis=2)
    formats = ["xsf", "vasp", "xyz", "traj"]    
    for fmt in formats:
        dirpath = Path(fmt)
        dirpath.mkdir(exist_ok=True)
        
        write(dirpath / f"{fi.stem}.{fmt}", atm)
        

    
    



