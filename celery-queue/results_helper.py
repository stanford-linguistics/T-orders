import os 
import zipfile
import shutil
  
def get_all_file_paths(directory):
    file_paths = [] 
    for root, directories, files in os.walk(directory): 
        for filename in files: 
            filepath = os.path.abspath(os.path.join(root, filename))
            file_paths.append(filepath) 

    return file_paths    

def zip_all(directory, zip_name):
    if os.path.exists(directory):
        root_directory = os.path.abspath(directory)
        file_paths = get_all_file_paths(directory)
        zip_path = os.path.join(directory, zip_name)
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zip: 
            for file in file_paths:
                arc_name = file[len(root_directory) + 1:]      
                zip.write(file, arc_name)
        zip.close()

def clean_directory(directory):
    if os.path.exists(directory):
        shutil.rmtree(directory)
