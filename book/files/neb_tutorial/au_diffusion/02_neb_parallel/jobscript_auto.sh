#!/bin/sh
#SBATCH --partition=i8cpu
#SBATCH --nodes=5
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

# Activate Quantum Espresso -----------------------------------------
export PATH=/home/k0107/k010725/apps/qe/QE/src/qe-7.2/bin:$PATH
export ESPRESSO_PSEUDO='/home/k0107/k010725/apps/qe/QE/pseudo/gbrv/pbe'
export ESPRESSO_TMPDIR='./TMPDIR'


# -- EXECUTION ----------------------------------------------------------------
echo "========= Job started  at `date` =========="

mkdir -p output_files_auto && cd output_files_auto
cp ../neb_auto.inp .
cp ../output_files_noci/pwscf.path .


start=$(date +%s)
srun neb.x -ni 5 -inp neb_auto.inp >> neb_auto.out
end=$(date +%s)
echo "Elapsed Time: $(($end-$start)) seconds"


echo "========= Job finished at `date` =========="
