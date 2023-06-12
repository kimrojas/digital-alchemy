# Catlearn - SQUID

Welcome to the installation procedure of catlearn on the SQUID supercomputer.


`````{admonition} Testing and examples
:class: warning
The following instructions assume you have completed the initialization procedure
described in [conda-squid](/docs/recipes/conda/conda-squid).
`````


## Environment preparation 

### **Load the required modules**

We load the intel compilers that may be needed for some of the packages we will install.
The `BaseCPU/2023` module contains the intel compilers, MPI, and MKL libraries.

```bash
module load BaseCPU/2023
```

### **Create a conda environment**

```bash
conda create -n catlearn python=3.10 pip

# Check if the environment is created
conda env list | grep catlearn
```

## Catlearn Installation

### **Download the Catlearn repository**

```{note}
An official release of catlearn is avaiable, however, it is very old. 
Many updates and fixes have been made since the last release and is available on the github repository.
I created a time-stamped clone of the repository on GitHub.
We will use this instead of the official release.
```


```bash
# Make a directory for catlearn
mkdir -p $WORK/apps/catlearn && cd $WORK/apps/catlearn

# Download and extract the unofficial release
wget https://github.com/kimrojas/CatLearn/archive/refs/tags/v0.6.2.tar.gz
tar zxvf v0.6.2.tar.gz
```


### **Install catlearn**

```bash
# Activate the catlearn environment
conda activate catlearn

# Install catlearn
pip install -v ./CatLearn-0.6.2
```

---


`````{admonition} Testing and examples
:class: tip
For testing and example calculations, visit the Tutorial section of the documentation.
`````










