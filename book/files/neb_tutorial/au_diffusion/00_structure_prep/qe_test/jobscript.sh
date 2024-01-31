#!/bin/sh
#SBATCH --partition=i8cpu
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=128
#SBATCH --time=00:30:00
#SBATCH --job-name=calc
#SBATCH --array=1

# -- ENVIRONMENT --------------------------------------------------------------
module purge
module load oneapi_compiler/2023.0.0 oneapi_mkl/2023.0.0 oneapi_mpi/2023.0.0
module list

export FI_PROVIDER=psm3
ulimit -s unlimited

# Activate python ---------------------------------------------------
source /home/k0107/k010725/apps/mambaforge/initialize_conda.sh
mamba activate catlearn

# Activate Quantum Espresso -----------------------------------------
export PATH=/home/k0107/k010725/apps/qe/QE/src/qe-7.2/bin:$PATH
export ESPRESSO_PSEUDO='/home/k0107/k010725/apps/qe/QE/pseudo/gbrv/pbe'
export ESPRESSO_TMPDIR='./TMPDIR'
export ASE_ESPRESSO_COMMAND="srun pw.x -in PREFIX.pwi > PREFIX.pwo"


# -- EXECUTION ----------------------------------------------------------------
echo "========= Job started  at `date` =========="
which pw.x
which python


python neb_Au_diffusion.py

echo "========= Job finished at `date` =========="
