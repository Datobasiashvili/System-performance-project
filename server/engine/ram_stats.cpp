#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main(){
    ifstream memFile("/proc/meminfo");
    string label;
    long totalMem, freeMem, availMem, active, dirty;

    while (memFile >> label){
        if (label == "MemTotal:"){
            memFile >> totalMem;
        } else if (label == "MemAvailable:"){
            memFile >> availMem;
        } else if (label == "Active:"){
            memFile >> active;
        } else if (label == "Dirty:"){
            memFile >> dirty;
            break;
        }
    }

    double usedPercent = ((double)(totalMem - availMem) / totalMem) * 100;

    cout << "{" 
     << "\"total\":" << totalMem  << ","
     << "\"available\":" << availMem  << ","
     << "\"percent\":" << usedPercent  << ","
     << "\"active\":" << active  << ","
     << "\"dirty\":" << dirty 
     << "}" << endl;
    return 0;
}