# How Connectivity.CLI Works

1. Go to **Connectivity.CLI** folder
2. Open Console
3. Run **Connectivity.CLI.exe** in the console

## How to call **Connectivity.CLI.exe**
```
Connectivity.CLI environment path_to_file command clear_db_flag
```

### Environment:
Defines target environment
1. Development
2. Staging
3. Production

### Path to file:
Defines path to the xml file. Can be relative or absolute.

### Command:
Can be one of the following:
1. import
2. export

### Clear DB flag
Indicates if DB should be cleared before a command starts execution. 

## Examples

### Import
```
Connectivity.CLI Development "Files/Cards_initial.xlsx" import y
```
