#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main(){
    ifstream memFile("/proc/meminfo");
    string label, unit;
    long totalMem, freeMem, availMem, active, dirty;

    while (memFile >> label){
        if (label == "MemTotal:"){
            memFile >> totalMem >> unit;
        } else if (label == "MemAvailable:"){
            memFile >> availMem >> unit;
        } else if (label == "Active:"){
            memFile >> active >> unit;
        } else if (label == "Dirty:"){
            memFile >> dirty >> unit;
            break;
        } else {
            string dummy;
            getline(memFile, dummy);
        }
    }

    double usedPercent = (totalMem > 0) ? ((double)(totalMem - availMem) / totalMem) * 100 : 0;

    cout << "{" 
     << "\"total\":" << totalMem  << ","
     << "\"available\":" << availMem  << ","
     << "\"percent\":" << usedPercent  << ","
     << "\"active\":" << active  << ","
     << "\"dirty\":" << dirty 
     << "}" << endl;
    return 0;
}