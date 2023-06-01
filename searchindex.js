Search.setIndex({"docnames": ["docs/benchmark-parallelization", "docs/dftbplus-install", "docs/gofee-install", "docs/python-env", "docs/usage-dftb", "docs/usage-gofee", "docs/usage-gofee-dftb", "docs/usage-overview", "docs/usage-t01", "docs/usage-t02", "docs/usage-t03", "docs/usage-t04", "docs/usage-t05", "docs/usage-t06", "docs/usage-t07", "docs/usage-t08", "docs/usage-t09", "docs/usage-t10", "docs/usage-t11", "docs/usage-t12", "intro"], "filenames": ["docs/benchmark-parallelization.md", "docs/dftbplus-install.md", "docs/gofee-install.md", "docs/python-env.md", "docs/usage-dftb.md", "docs/usage-gofee.md", "docs/usage-gofee-dftb.md", "docs/usage-overview.md", "docs/usage-t01.md", "docs/usage-t02.md", "docs/usage-t03.md", "docs/usage-t04.md", "docs/usage-t05.md", "docs/usage-t06.md", "docs/usage-t07.md", "docs/usage-t08.md", "docs/usage-t09.md", "docs/usage-t10.md", "docs/usage-t11.md", "docs/usage-t12.md", "intro.md"], "titles": ["Parallelization", "DFTB+ installation", "GOFEE Installation", "Python environment", "DFTB+ calculation", "GOFEE calculation", "GOFEE with DFTB+ calculation", "Overview", "H2O system", "HB sheet system", "HB sheet system - parallelized", "C6H6 system", "C6H6 system - parallelized", "C6H6 system - multirun", "&lt;no title&gt;", "&lt;no title&gt;", "&lt;no title&gt;", "C6H6 system", "HB sheet system", "Ti5O10 system", "Welcome to the GOFEE with DFTB+ tutorial"], "terms": {"There": 1, "ar": [1, 3, 8, 9, 10, 11, 12, 13, 17, 18, 19, 20], "two": 1, "wai": [1, 3], "via": 1, "forg": [1, 3], "easier": 1, "setup": 1, "less": 1, "optim": 1, "In": 1, "thi": [1, 3, 13, 20], "document": [1, 20], "discuss": [1, 17, 18, 19], "detail": 1, "The": [1, 3, 8, 9, 10, 12, 13, 20], "execut": [1, 11, 17, 18, 19], "can": [1, 3, 12], "4": [1, 3, 17, 18, 19], "parallel": [1, 7, 13, 17, 18, 19], "type": [1, 10, 17, 18, 19], "non": [1, 17, 18, 19], "thread": [1, 10, 17, 18, 19], "share": [1, 8, 9, 10, 17, 18, 19], "memori": 1, "distribut": 1, "hybrid": 1, "For": 1, "simplic": 1, "stabil": 1, "also": 1, "default": [1, 3, 10, 17, 18, 19], "just": 1, "good": 1, "test": [1, 3, 8, 9, 10, 11, 12, 13, 17, 18, 19, 20], "seem": 1, "rel": [1, 17, 18, 19], "small": [1, 20], "system": [1, 7], "singl": 1, "node": [1, 12, 13], "mai": 1, "better": 1, "larger": 1, "requir": 1, "more": [1, 3, 20], "than": 1, "take": 1, "longer": 1, "between": 1, "paral": 1, "Its": 1, "usag": [1, 7], "heavili": 1, "otherhand": 1, "support": 1, "excit": 1, "state": 1, "while": 1, "ha": 1, "mani": 1, "task": 1, "modul": [1, 3, 12, 13], "cmake": [1, 12, 13], "3": [1, 3, 11, 12, 13, 17, 18, 19], "18": [1, 3, 12, 13], "intel": [1, 12, 13], "2020": [1, 12, 13], "254": [1, 12, 13], "intelmpi": [1, 12, 13], "8": [1, 3, 9, 10, 12, 13, 17, 18, 19], "sourc": [1, 12, 13], "activ": [1, 12, 13], "tutori": [1, 3, 13, 17, 18, 19], "we": [1, 10, 12, 13, 17, 18, 19], "22": [1, 3, 19], "other": 1, "releas": 1, "avail": [1, 8, 9, 10, 11, 12, 13], "here": [1, 3, 17, 18, 19, 20], "first": 1, "creat": [1, 13, 20], "tutorial_fil": [1, 2, 12, 13], "home": [1, 2, 8, 9, 10, 17, 18, 19], "keep": [1, 13], "our": 1, "file": [1, 3, 8, 9, 10, 11, 12, 13, 20], "clean": 1, "tutordir": 1, "mkdir": [1, 13], "p": [1, 8, 9, 10, 13, 17, 18, 19], "app": [1, 2], "cd": [1, 2, 13], "b": [1, 11, 17, 18, 19], "feel": [1, 3, 20], "free": [1, 3, 20], "choos": 1, "ani": [1, 3], "wget": [1, 2, 20], "http": [1, 2, 20], "raw": [1, 20], "githubusercont": 1, "com": [1, 20], "kimroja": [1, 20], "gofe": [1, 7, 11, 12, 13, 17, 18, 19], "book": [1, 20], "master": [1, 2, 20], "py": [1, 3, 12, 13], "chmod": 1, "x": 1, "case": [1, 12, 13], "you": [1, 3], "It": [1, 17, 18, 19], "work": [1, 3], "been": 1, "veri": 1, "slightli": 1, "hard": [1, 3], "return": 1, "an": [1, 3, 8, 9, 10, 20], "advic": 1, "how": [1, 20], "properli": 1, "my": [1, 3], "look": 1, "like": 1, "show": 1, "import": [1, 3, 8, 9, 10, 11, 17, 18, 19], "base": [1, 3, 12], "kroja": [1, 2, 8, 9, 10, 17, 18, 19], "dftbplu": 1, "_instal": 1, "add": [1, 3], "bin": [1, 2, 3, 8, 9, 10, 12, 13], "ld_library_path": 1, "lib64": 1, "pythonpath": [1, 2], "lib": [1, 8, 9, 10, 17, 18, 19], "python3": 1, "site": 1, "packag": [1, 3], "pythonapi": 1, "0": [1, 3, 8, 9, 10, 11, 17, 18, 19], "py3": 1, "egg": 1, "set": [1, 3, 10, 12, 13, 17, 18, 19], "variabl": [1, 10], "dftb_lib": 1, "slako": [1, 8, 9, 10, 17, 18, 19], "org": 1, "paramet": [1, 17, 18, 19], "all": [1, 3], "sk": 1, "few": 1, "updat": [1, 3], "startup": 1, "bashrc": 1, "bash_profil": 1, "custom": 1, "c": [1, 3, 11, 17, 18, 19], "export": [1, 2, 12, 13], "let": 1, "s": [1, 3, 8, 9, 10, 12, 13, 17, 18], "activate_dftb": 1, "sh": [1, 2, 12, 13], "bash": [1, 2, 12, 13], "installdir": [1, 2], "from": [1, 8, 9, 10, 11, 17, 18, 19], "now": 1, "complet": 1, "A": [1, 8, 9, 10, 11, 12, 13, 17, 18, 19], "simpli": [1, 3], "n": [1, 3, 12, 13], "mpi_openmpi_": 1, "tool": 1, "grendel": 2, "www": 2, "cscaa": 2, "dk": 2, "mkb": 2, "_download": 2, "694ca887012ad412602f2a45ee7b2ea2": 2, "gofee_st": 2, "tar": [2, 20], "gz": [2, 20], "zxvf": 2, "build_cod": 2, "activate_gofe": 2, "follow": [2, 3], "content": 2, "part": 3, "consid": 3, "most": 3, "difficult": 3, "due": 3, "latest": 3, "version": 3, "depend": 3, "break": 3, "compat": [3, 20], "us": [3, 8, 9, 10, 11, 12, 13, 17, 18, 19, 20], "solver": 3, "i": 3, "some": 3, "preserv": 3, "instal": [3, 20], "stabl": 3, "copi": 3, "chang": [3, 12, 13], "envnam": 3, "load": [3, 12, 13], "compil": 3, "ase": [3, 8, 9, 10, 11, 17, 18, 19], "1": [3, 9, 10, 11, 12, 13, 17, 18, 19], "cymem": 3, "cython": 3, "mpi4pi": 3, "numpi": [3, 11, 17, 18, 19], "pytest": 3, "scikit": 3, "learn": 3, "scipi": 3, "dscribe": 3, "matplotlib": 3, "call": 3, "ASE": [3, 8, 9, 10], "alreadi": 3, "depreci": 3, "recent": 3, "henc": 3, "encount": 3, "warn": 3, "visibledeprecationwarn": 3, "get_global_number_of_atom": 3, "instead": 3, "particular": 3, "print": [3, 8, 9, 10, 11, 12, 13, 17, 18, 19], "out": [3, 8, 9, 10, 17, 18, 19], "standard": 3, "output": [3, 8, 9, 10], "If": [3, 20], "bother": 3, "your": 3, "workflow": 3, "ignor": 3, "line": [3, 20], "start": [3, 11, 12, 13, 17, 18, 19], "filterwarn": 3, "categori": 3, "np": [3, 11, 12, 13, 17, 18, 19], "env": [3, 8, 9, 10], "f": [3, 8, 9, 10, 12, 13, 17, 18, 19], "yml": 3, "name": 3, "channel": 3, "_libgcc_mutex": 3, "conda_forg": 3, "_openmp_mutex": 3, "5": [3, 11, 17, 18, 19], "2_gnu": 3, "pyhd8ed1ab_1": 3, "attr": 3, "21": 3, "pyhd8ed1ab_0": 3, "brotli": 3, "9": 3, "h166bdaf_7": 3, "ca": 3, "certif": 3, "2022": 3, "6": [3, 11, 17], "15": 3, "ha878542_0": 3, "certifi": 3, "py38h578d9bd_0": 3, "click": 3, "cycler": 3, "11": 3, "2": [3, 11, 12, 13, 17, 18, 19], "py38hfa26641_3": 3, "29": 3, "30": 3, "py38hfa26641_0": 3, "dbu": 3, "13": 3, "hfdff14a_1": 3, "py38h1fd1430_1": 3, "expat": 3, "h27087fc_0": 3, "flask": 3, "fontconfig": 3, "14": 3, "h8e229c2_0": 3, "fonttool": 3, "34": 3, "py38h0a891b7_0": 3, "freetyp": 3, "10": [3, 19], "h0708190_1": 3, "gettext": 3, "19": 3, "hf34092f_1004": 3, "giflib": 3, "h36c2ea0_2": 3, "glib": 3, "66": 3, "h58526e2_0": 3, "gst": 3, "plugin": 3, "h0935bb2_2": 3, "gstreamer": 3, "h36ae1b5_2": 3, "icu": 3, "64": 3, "he1b5a44_1": 3, "importlib": 3, "metadata": 3, "iniconfig": 3, "pyh9f0ad1d_0": 3, "itsdanger": 3, "jinja2": 3, "joblib": 3, "jpeg": 3, "9e": 3, "h166bdaf_2": 3, "kiwisolv": 3, "py38h43d8883_0": 3, "lcms2": 3, "12": [3, 11, 18], "hddcbb42_0": 3, "ld_impl_linux": 3, "36": 3, "hea4e1c9_2": 3, "lerc": 3, "h9c3ff4c_0": 3, "libbla": 3, "15_linux64_openbla": 3, "libbrotlicommon": 3, "libbrotlidec": 3, "libbrotlienc": 3, "libcbla": 3, "libclang": 3, "default_hb4e5071_5": 3, "libdefl": 3, "h166bdaf_0": 3, "libffi": 3, "he1b5a44_1007": 3, "libgcc": 3, "ng": 3, "h8d9b700_16": 3, "libgfortran": 3, "h69a702a_16": 3, "libgfortran5": 3, "hdcd56e2_16": 3, "libglib": 3, "hbe7bbb4_0": 3, "libgomp": 3, "libiconv": 3, "16": [3, 12, 13], "h516909a_0": 3, "liblapack": 3, "libllvm11": 3, "hf817b99_3": 3, "libllvm9": 3, "default_hc23dcda_7": 3, "libopenbla": 3, "20": [3, 11, 17, 18, 19], "pthreads_h78a6416_0": 3, "libpng": 3, "37": 3, "h753d276_3": 3, "libstdcxx": 3, "ha89aaad_16": 3, "libtiff": 3, "hc85c160_1": 3, "libuuid": 3, "32": 3, "h7f98852_1000": 3, "libwebp": 3, "h3452ae3_0": 3, "h7f98852_1": 3, "libxcb": 3, "h7f98852_1004": 3, "libxkbcommon": 3, "he1b5a44_0": 3, "libxml2": 3, "hee79883_0": 3, "libzlib": 3, "llvmlite": 3, "38": 3, "py38h38d86a4_0": 3, "lz4": 3, "h9c3ff4c_1": 3, "markupsaf": 3, "py38h0a891b7_1": 3, "py38h826bfd8_0": 3, "mpi": [3, 12], "mpich": 3, "py38h97ac3a3_1": 3, "h846660c_100": 3, "munkr": 3, "ncurs": 3, "h27087fc_1": 3, "nspr": 3, "nss": 3, "78": 3, "h2350873_0": 3, "numba": 3, "55": 3, "py38hdc3674a_0": 3, "py38h6ae9a64_0": 3, "openjpeg": 3, "hb52868f_1": 3, "openssl": 3, "1q": 3, "pcre": 3, "45": 3, "pillow": 3, "py38h0ee0e06_0": 3, "pip": 3, "pluggi": 3, "py38h578d9bd_3": 3, "pthread": 3, "stub": 3, "h36c2ea0_1001": 3, "pyh6c4a22f_0": 3, "pybind11": 3, "py38h43d8883_1": 3, "global": 3, "pypars": 3, "pyqt": 3, "py38ha8c2ead_3": 3, "7": 3, "cpython_he5300dc_0": 3, "dateutil": 3, "python_abi": 3, "2_cp38": 3, "qt": 3, "hd8c4c69_1": 3, "readlin": 3, "h0f457ee_0": 3, "py38hf80bbf7_0": 3, "py38h1ee437e_0": 3, "setuptool": 3, "63": 3, "six": 3, "spars": 3, "sqlite": 3, "39": 3, "h4ff8645_0": 3, "threadpoolctl": 3, "pyh8a188c0_0": 3, "tk": 3, "h27826a3_0": 3, "tomli": 3, "tornado": 3, "unicodedata2": 3, "werkzeug": 3, "wheel": 3, "xorg": 3, "libxau": 3, "h7f98852_0": 3, "libxdmcp": 3, "xz": 3, "h516909a_1": 3, "zipp": 3, "zlib": 3, "zstd": 3, "h8a70e8d_2": 3, "pyqt5": 3, "sip": 3, "pyqtchart": 3, "pyqtwebengin": 3, "newer": 3, "17": 3, "28": 3, "31": 3, "except": 3, "23": 3, "which": [3, 13], "core": 3, "process": 3, "calcul": [3, 7, 8, 9, 10, 11, 12, 13, 17, 18, 19, 20], "local": 3, "smith": 3, "futur": [3, 17, 18, 19], "reproduc": 3, "dftb": [7, 8, 9, 10, 12, 13, 17, 18, 19], "h2o": 7, "hb": 7, "sheet": 7, "c6h6": 7, "multirun": 7, "ti5o10": 7, "simpl": [8, 9, 11], "interfac": [8, 9, 10], "suit": [8, 9, 10, 11, 12, 13, 20], "provid": [8, 9, 10, 11, 12, 13], "usr": [8, 9, 10], "python": [8, 9, 10, 12, 13, 20], "os": [8, 9, 10, 17, 18, 19], "build": 8, "molecul": 8, "environ": [8, 9, 10, 12, 13, 17, 18, 19, 20], "dftb_prefix": [8, 9, 10, 17, 18, 19], "matsci": [8, 9, 10, 17, 18, 19], "ase_dftb_command": [8, 9, 10, 17, 18, 19], "prefix": [8, 9, 10, 17, 18, 19], "defin": [8, 9, 10, 11, 17, 18, 19], "atom": [8, 9, 10, 11, 17, 18, 19], "calc": [8, 9, 10, 11, 17, 18, 19], "label": [8, 9, 10, 17, 18, 19], "hamiltonian_scc": [8, 9, 10, 17, 18, 19], "ye": [8, 9, 10], "hamiltonian_maxangularmomentum_": [8, 9, 10, 17, 18, 19], "hamiltonian_maxangularmomentum_h": [8, 9, 10, 17, 18], "hamiltonian_maxangularmomentum_o": [8, 19], "hamiltonian_charg": [8, 9, 10, 17, 18, 19], "000000": [8, 9, 10, 17, 18, 19], "hamiltonian_fil": [8, 9, 10, 17, 18, 19], "fermi": [8, 9, 10, 17, 18, 19], "hamiltonian_filling_empti": [8, 9, 10, 17, 18, 19], "temperatur": [8, 9, 10, 17, 18, 19], "kelvin": [8, 9, 10, 17, 18, 19], "attach": [8, 9, 10], "AND": [8, 9, 10], "energi": [8, 9, 10], "en": [8, 9, 10], "get_potential_energi": [8, 9, 10], "ev": [8, 9, 10], "hydrogen": [9, 10], "borid": [9, 10], "io": [9, 10, 11, 17, 18, 19], "read": [9, 10, 11, 17, 18, 19], "structur": [9, 10, 11, 12, 13, 17, 18, 19], "traj": [9, 10, 18], "hamiltonian_maxangularmomentum_b": [9, 10, 18], "kpt": [9, 10, 17, 18, 19], "control": [10, 12], "omp_num_thread": [10, 12, 13, 17, 18, 19], "argpars": [10, 17, 18, 19], "argumentpars": [10, 17, 18, 19], "parser": [10, 17, 18, 19], "add_argu": [10, 17, 18, 19], "t": [10, 13, 17, 18, 19], "int": [10, 17, 18, 19], "arg": [10, 17, 18, 19], "parse_arg": [10, 17, 18, 19], "search": [11, 12, 13, 17, 18, 19], "sy": [11, 17, 18, 19], "time": [11, 17, 18, 19], "emt": 11, "surrog": [11, 17, 18, 19], "gpr": [11, 17, 18, 19], "candid": [11, 17, 18, 19], "candidategener": [11, 17, 18, 19], "startgener": [11, 17, 18, 19], "rattlemut": [11, 17, 18, 19], "rattlemutation2": [11, 17, 18, 19], "permutationmut": [11, 17, 18, 19], "supercel": [11, 17, 18, 19], "templat": [11, 17, 18, 19], "cell": [11, 17, 18, 19], "ey": [11, 17, 18, 19], "confin": [11, 17, 18, 19], "box": [11, 17, 18, 19], "confinement_cel": [11, 17, 18, 19], "confinement_corn": [11, 17, 18, 19], "arrai": [11, 13, 17, 18, 19], "stoichiometri": [11, 17, 18, 19], "gener": [11, 17, 18, 19, 20], "mutat": [11, 17, 18, 19], "sg": [11, 17, 18, 19], "rattl": [11, 17, 18, 19], "n_to_optim": [11, 17, 18, 19], "len": [11, 17, 18, 19], "permut": [11, 18], "npermut": [11, 18], "nrattl": [11, 17, 18, 19], "rattle_rang": [11, 17, 18, 19], "candidate_gener": [11, 17, 18, 19], "start_tim": [11, 17, 18, 19], "max_step": [11, 17, 18, 19], "population_s": [11, 17, 18, 19], "run": [11, 13, 17, 18, 19], "end_tim": [11, 17, 18, 19], "elapsed_tim": [11, 17, 18, 19], "second": [11, 17, 18, 19], "degre": 12, "mpirun": [12, 13], "nslot": [12, 13], "input_c6h6_parallel": 12, "command": [12, 20], "input": [12, 13], "same": [12, 13], "previou": [12, 13], "jobscript": [12, 13], "cwd": [12, 13], "q": [12, 13], "xs2": [12, 13], "pe": [12, 13], "x16": [12, 13], "j": [12, 13], "y": [12, 13], "dftb_c6h6_parallel": 12, "conda": [12, 13], "tutorial317": 12, "scripts_dir": [12, 13], "script": [12, 13], "i_mpi_pin": [12, 13], "i_mpi_fabr": [12, 13], "shm": [12, 13], "ofi": [12, 13], "cat": [12, 13], "pe_hostfil": [12, 13], "awk": [12, 13], "hostfil": [12, 13], "job_id": [12, 13], "echo": [12, 13], "job": [12, 13], "date": [12, 13], "finish": [12, 13], "rm": [12, 13], "simultan": 13, "befor": 13, "multipl": 13, "increas": 13, "success": 13, "rate": 13, "do": 13, "option": 13, "dftb_c6h6_multirun": 13, "pythonfil": 13, "input_c6h6_multirun": 13, "workdir": 13, "run_": 13, "sge_task_id": 13, "cp": 13, "fast": [17, 18, 19], "accur": [17, 18, 19], "evalu": [17, 18, 19], "implement": [17, 18, 19], "mix": [17, 18, 19], "purpos": [17, 18, 19], "onli": [17, 18, 19], "product": [17, 18, 19], "util": [17, 18, 19], "operationconstraint": [17, 18, 19], "No": [17, 18, 19], "hamiltonian_maxangularmomentum_c": 17, "pbc": [17, 19], "probabl": [17, 19], "oper": [17, 19], "50": [17, 19], "scaffold": 18, "get_cel": 18, "000": 18, "box_constraint": 18, "position_constraint": 18, "hamiltonian_maxangularmomentum_ti": 19, "d": 19, "topic": 20, "explor": 20, "prepar": 20, "download": 20, "Or": 20, "github": 20, "inform": 20, "need": 20, "issu": 20, "repositori": 20}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"parallel": [0, 10, 12], "come": 0, "soon": 0, "dftb": [1, 3, 4, 6, 20], "instal": [1, 2], "compil": 1, "method": 1, "what": 1, "us": 1, "serial": 1, "openmp": 1, "mpi": 1, "load": 1, "python": [1, 3], "environ": [1, 3], "download": [1, 2], "1": 1, "prepar": 1, "directori": 1, "2": 1, "autom": 1, "script": 1, "want": 1, "version": 1, "declar": 1, "path": 1, "conda": [1, 3], "pre": 1, "gofe": [2, 3, 5, 6, 20], "procedur": 2, "file": 2, "build": 2, "packag": 2, "creat": [2, 3], "an": 2, "activ": 2, "via": 3, "creation": 3, "exact": 3, "yaml": 3, "specif": 3, "gener": 3, "inform": 3, "requir": 3, "custom": 3, "calcul": [4, 5, 6], "overview": 7, "h2o": 8, "system": [8, 9, 10, 11, 12, 13, 17, 18, 19], "hb": [9, 10, 18], "sheet": [9, 10, 18], "c6h6": [11, 12, 13, 17], "multirun": 13, "ti5o10": 19, "welcom": 20, "tutori": 20}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinx": 56}})