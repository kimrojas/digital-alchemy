#!/bin/sh
#SBATCH --partition=i8cpu
#SBATCH --nodes=5
#SBATCH --ntasks-per-node=128
#SBATCH --mem-per-cpu=1G
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

mkdir -p output_files && cd output_files
cp ../mlneb.py .
cp ../pathway.traj .

start=$(date +%s)
OMP_NUM_THREADS=128 python mlneb.py
end=$(date +%s)
echo "Elapsed Time: $(($end-$start)) seconds"

echo "========= Job finished at `date` =========="
