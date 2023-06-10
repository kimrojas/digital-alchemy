# Quantum Espresso - SMITH

```{epigraph}
This recipe shows how to install quantum espresso on the smith cluster.
```

## Installation procedure

### Setup installation directory

```bash
# Create installation directory 
mkdir -p $HOME/apps/qe && cd $HOME/apps/qe
```

### Download the installation file

We download the installation file from the [Quantum Espresso repository](https://gitlab.com/QEF/q-e/-/tags). As of the moment of writing, the latest version is [qe-7.2](https://gitlab.com/QEF/q-e/-/archive/qe-7.2/q-e-qe-7.2.tar.gz).

```bash
# Download and extract the installation file
wget -c https://gitlab.com/QEF/q-e/-/archive/qe-7.2/q-e-qe-7.2.tar.gz
tar zxvf q-e-qe-7.2.tar.gz
cd q-e-qe-7.2
```

### Load the required modules

Intel compiler, MPI and MKL are already installed on the cluster. We just need to load the corresponding modules.

```bash
# Load version 2020.2.254
module load intel/2020.2.254 intelmpi/2020.2.254
```

### Configure and install
We just need to setup the scalapack settings with configure. Here we compile only the pwall since we are not interested in the other executables.

```bash
./configure --with-scalapack=intel
make -j8 pwall
```

The executable files should be in the `bin` directory.

```bash
$HOME/apps/qe/q-e-qe-7.2/bin
```

### Finalize PATH

We need to add the executables to the environment PATH variable. We can do this by adding the following line to the `.bashrc` file.

```bash
# Export the path to the executables
export PATH=$HOME/apps/qe/q-e-qe-7.2/bin:$PATH
```

## Get the pseudopotentials

There are many pseudopotentials available for Quantum Espresso. We will use the ones from the [GBRV library](https://www.physics.rutgers.edu/gbrv/). We can download the pseudopotentials with the following commands:

```bash
cd $HOME/apps/qe
mkdir -p pseudo && cd pseudo
wget https://www.physics.rutgers.edu/gbrv/all_pbe_UPF_v1.5.tar.gz
mkdir -p gbrv_pbe && tar zxvf all_pbe_UPF_v1.5.tar.gz -C gbrv_pbe
```

Path to the pseudopotentials is:

```bash
$HOME/apps/qe/pseudo/gbrv_pbe
```