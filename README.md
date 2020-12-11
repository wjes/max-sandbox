# Problema

[a relative link](other_file.md)

Necesitamos instalar y correr un módulo que hizo un amigo en Python + MongoDB: [https://github.com/astng/module_ai](https://github.com/astng/module_ai)

El problema es que no tenemos mucho conocimiento sobre Python y el README del módulo es un tanto críptico. 

# Requerimiento

Lograr instalar el módulo y hacerlo funcionar en tu máquina local.

# Contexto

El módulo se desarrolló en dos tandas. Primero el cliente nos pidió traspasar un árbol de decisión que estaba en la plataforma antigua. Luego, el cliente nos pidió implementar un nuevo algoritmo de inteligencia artificial.

Por desgracia, para cuando necesitábamos usar el árbol de decisión, varios de los paquetes y el proceso de instalación no funcionaban, por tanto tuvimos que empezar a indagar y descuartizar paquetes para poder tener las funciones del árbol y así cumplir con la fecha del entregable. Por supuesto, debimos haber matado varios de los paquetes que usaba la segunda implementación (la cual debemos entregar funcionando en el siguiente entregable). 

# Árbol de decisión

Para que no te tropieces con las mismas piedras te comparto el proceso que hicimos para poder instalar el árbol de decisión:

1. Clonar el repo

```sh
$ git clone --depth 1 https://github.com/astng/module_ai.git
```

2. Instalar paquetes 

Los paquetes a instalar están en `requirements.txt`

```sh
$ cd module_ai
$ virtualenv -p python3 venv
$ source venv/bin/activate
$ pip install --no-cache-dir -r requirements.txt --log LOG
$ python3 setup.py develop
```

Te deberían salir errores por paquetes que están descontinuados o paquetes inexistentes. Aquí es donde empezamos a actualizar y eliminar paquetes hasta terminar con ésto :

```sh
$ cat requirements.txt

absl-py==0.9.0
astor==0.8.1
cachetools==4.1.1
certifi==2020.6.20
chardet==3.0.4
cycler==0.10.0
gast==0.3.3
google-auth==1.20.0
google-auth-oauthlib==0.4.1
google-pasta==0.2.0
grpcio==1.30.0
h5py==2.10.0
idna==2.10
imbalanced-learn==0.7.0
imblearn==0.0
joblib==0.16.0
Keras==2.4.3
Keras-Applications==1.0.8
Keras-Preprocessing==1.1.2
kiwisolver==1.2.0
Markdown==3.2.2
matplotlib==3.3.0
mock==4.0.2
mysqlclient==2.0.1
numexpr==2.7.1
numpy==1.18.5
oauthlib==3.1.0
opt-einsum==3.3.0
pandas==1.1.0
protobuf==3.12.4
pyasn1==0.4.8
pyasn1-modules==0.2.8
pymongo==3.11.0
pyparsing==2.4.7
python-dateutil==2.8.1
pytz==2020.1
PyYAML==5.3.1
requests==2.24.0
requests-oauthlib==1.3.0
rsa==4.6
scikit-learn==0.23.1
scipy==1.4.1
seaborn==0.10.1
six==1.15.0
sklearn==0.0
tables==3.6.1
tb-nightly==2.4.0a20200801
tensorboard==2.3.0
tensorflow-estimator==2.3.0
tensorflow-gpu==2.3.0
termcolor==1.1.0
tf-estimator-nightly==2.0.0.dev2020010409
tf-nightly==2.4.0.dev20200801
tornado
urllib3==1.25.10
webcolors==1.11.1
Werkzeug==1.0.1
wrapt==1.12.1
xlrd==1.2.0
``` 


3. Migrar datos desde MySQL a MongoDB

Este paso migra la base de datos de la plataforma antigua a la nueva

```sh
$ python update_from_code_before/traspasando_logicas_a_mongo.py --laboratory antofagasta --user stng --password stng123 --db astng --table logics --mysql_db dictuc_tribologia
$ python update_from_code_before/traspasando_logicas_a_mongo.py --laboratory collahuasi --user stng --password stng123 --db astng --table logics --mysql_db dictuc_collahuasi
$ python update_from_code_before/traspasando_logicas_a_mongo.py --laboratory centinela --user stng --password stng123 --db astng --table logics --mysql_db dictuc_centinela
$  

$ python update_from_code_before/traspasando_limites_de_muestras_a_mongo.py --laboratory antofagasta --user stng --password stng123 --db astng --table limits --mysql_db dictuc_tribologia
$ python update_from_code_before/traspasando_limites_de_muestras_a_mongo.py --laboratory collahuasi --user stng --password stng123 --db astng --table limits --mysql_db dictuc_collahuasi
$ python update_from_code_before/traspasando_limites_de_muestras_a_mongo.py --laboratory centinela --user stng --password stng123 --db astng --table limits --mysql_db dictuc_centinela
```

Donde `--user`, `--password` y `--db` corresponden a los parámetros de la nueva base de datos en MongoDB y `--mysql_db` a la antigua en MySQL

Las bases de datos antiguas con las tablas mínimas para que esto funcione están incluidas en el repo (`dictuc_centinela.sql`, `dictuc_collahuasi.sql` y `dictuc_tribologia.sql`)

4. Archivo de configuración

Antes de correr el módulo hay que modificar algunos parámetros para conectarse a MongoDB en `config/config_default.json` :

```json
{
  "db_name": "astng",
  "table_characterizations": "component_characterization",
  "table_logic": "logics",
  "table_algorithm_results":  "algorithm_results",
  "table_essay_limits": "limits",
  "port": 6788
}
```

5. Correr el módulo

```sh
$ cd module_ai
$ source venv/bin/activate
$ python -m api.main_api -c ./config/config_default.json
```

6. Testeo

Para testear si todo funcionó puedes revisar la Wiki del módulo donde aparecen los casos de uso : [https://github.com/astng/module_ai/wiki/Decision-Tree-Module](https://github.com/astng/module_ai/wiki/Decision-Tree-Module)

Qué no te abrume la cantidad de texto, sólo hay que copiar los ejemplos con `curl`, pegarlos en la terminar y ver si el resultado coincide con el de la Wiki.

