from ase.neb import NEB
from ase.io import read, write
import argparse

parser = argparse.ArgumentParser(description="Pathway Generation Script")

parser.add_argument("-ni", "--nimages", type=int, required=True, help="Total number of images in the pathway (including initial and final)")
parser.add_argument("-i", "--initial", type=str, required=True, help="Path to initial structure file (readable by ASE)")
parser.add_argument("-f", "--final", type=str, required=True, help="Path to final structure file (readable by ASE)")
parser.add_argument("-m", "--method", type=str, default="idpp", choices=["linear", "idpp"], help="Image interpolation method ('linear' or 'idpp', default: idpp)")
parser.add_argument("-o", "--output", type=str, default="pathway", help="Output file name (default: pathway)")


args = parser.parse_args()


# --- Main ---

print("Reading initial structure from {}".format(args.initial))
initial = read(args.initial)
print("Reading final structure from {}".format(args.final))
final = read(args.final)

print("Generating pathway with {} images".format(args.nimages))
print("Interpolation method: {}".format(args.method))

images = [initial]
for i in range(args.nimages - 2):
    images.append(initial.copy())
images.append(final)


neb = NEB(images)
if args.method == "linear":
    neb.interpolate()
if args.method == "idpp":
    neb.interpolate(method='idpp')

print("Writing pathway to {}.traj".format(args.output))

write(args.output + ".traj", images)

print("Writing pathway to {}.neb-espresso".format(args.output))
def print_positions(img, f):
    try:
        cindex = img.get_constraint().get_indices()
    except:
        cindex = []
    for i, pos in enumerate(img.positions):
        f.write(f"  {img.get_chemical_symbols()[i]}    ")
        f.write(f"{pos[0]:>18.10f}  {pos[1]:>18.10f}  {pos[2]:>18.10f}")
        if i in cindex:
            f.write("  0  0  0")
        f.write("\n")

with open(f"{args.output}.neb-espresso", "w") as f:
    for i, img in enumerate(images):
        if i == 0:
            f.write("FIRST_IMAGE\n")
        elif i == len(images) - 1:
            f.write("LAST_IMAGE\n")
        else:
            f.write("INTERMEDIATE_IMAGE\n")
        f.write("ATOMIC_POSITIONS angstrom\n")
        print_positions(img, f)
    f.write("END_POSITIONS\n")



