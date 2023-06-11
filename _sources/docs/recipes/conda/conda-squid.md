# CONDA - SQUID

The following discusses the process of setting up a conda environment for SQUID supercomputer. 


## Initial setup 

By default, the conda installation will put the files to **home** drive. This is not good
because the allocated drive space is not big enough. Therefore, we need to change the
installation path to the **work** drive 

### **Declare the WORK directory as an environment variable**

For fast and easy installation, we will first declare the WORK directory as an 
environment variable. Add the following to `.bash_profile` file

```bash
# Change GROUP_NAME and USER_NUMBER to your group name and user number
export WORK=/sqfs/work/GROUP_NAME/USER_NUMBER
``` 

After this, source the `.bash_profile` file

```bash
source ~/.bash_profile

# Check if the WORK directory is declared
echo "HOME directory: " $HOME
echo "WORK directory: " $WORK
```


### **Configure new package and environment location**

```bash
mkdir -p $WORK/apps/conda
conda config --add envs_dirs $WORK/apps/conda/conda_env
conda config --add pkgs_dirs $WORK/apps/conda/conda_pkg

# Check if the configuration is successful
conda config --show | grep  -e pkgs_dirs  -e envs_dirs -A 1
```

For more information: http://www.hpc.cmc.osaka-u.ac.jp/system/manual/squid-use/anaconda/



