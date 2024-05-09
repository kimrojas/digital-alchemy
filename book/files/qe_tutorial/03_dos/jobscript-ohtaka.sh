#!/bin/bash
#SBATCH --partition=i8cpu
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=128
#SBATCH --time=00:30:00
#SBATCH --job-name=calc
#SBATCH --array=0

# -- ENVIRONMENT --------------------------------------------------------------
source ~/.bashrc
module purge
module load oneapi_compiler/2023.0.0 oneapi_mkl/2023.0.0 oneapi_mpi/2023.0.0
module list

export FI_PROVIDER=psm3
ulimit -s unlimited

# Activate QE environment ------------------------------------------------------
export PATH=$HOME/apps/qe/QE/src/qe-7.2/bin:$PATH
export ESPRESSO_PSEUDO=$HOME/apps/qe/QE/pseudo/gbrv/pbe
export ESPRESSO_TMPDIR=TMPDIR
export ASE_ESPRESSO_COMMAND='srun pw.x -nk 2 pw.x -in PREFIX.pwi > PREFIX.pwo'

# Activate Python environment --------------------------------
mamba activate qe_tutorial
echo "CONDA ENV: " $CONDA_PREFIX

# -- EXECUTION ----------------------------------------------------------------
echo "========= Job started  at `date` =========="

python run_dos.py

echo "========= Job finished at `date` =========="


