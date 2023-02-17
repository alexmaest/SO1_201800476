#!/bin/bash

file="../home/archivo.log"

# Esperar hasta que el archivo sea creado
while [ ! -f $file ]; do
    sleep 1
done

# Definir función para ejecutar el script
execute_script () {
    # Contar la cantidad de registros en el archivo
    count=$(cat $file | wc -l)

    # Contar el número de líneas que contienen la palabra "true"
    count2=$(grep -c "true" $file)

    # Contar el número de líneas que contienen la palabra "+"
    count3=$(grep -c "\"+\"" $file)

    # Contar el número de líneas que contienen la palabra "-"
    count4=$(grep -c "\"-\"" $file)

    # Contar el número de líneas que contienen la palabra "*"
    count5=$(grep -c "\\*" $file)

    # Contar el número de líneas que contienen la palabra "/"
    count6=$(grep -c "\"/\"" $file)

    # Obtener la fecha de hoy en formato YYYY-MM-DD
    today=$(date +%Y-%m-%d)

    # Filtrar los registros del archivo que son de hoy
    filtered=$(grep -w "$today" $file)

    # Imprimir el contador
    echo ".................................................................................................................."
    echo "Cantidad de registros es: $count"
    echo "Cantidad de registros con errores: $count2"
    echo "Cantidad de operaciones por separado: Sumas:$count3, Restas:$count4, Multiplicacion:$count5, Division:$count6"
    echo "Se muestran los registros de hoy: "
    echo $filtered
}

# Ejecutar el script por primera vez
execute_script

# Esperar a que el archivo cambie y ejecutar el script nuevamente
while inotifywait -q -e modify,create,delete,move $file >/dev/null 2>&1; do
    execute_script
done
