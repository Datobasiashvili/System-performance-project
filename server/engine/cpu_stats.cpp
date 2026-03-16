#include <iostream>
#include <fstream>
#include <unistd.h>
#include <string>
using namespace std;

struct Snap{
    long idle;
    long total;
};

Snap takeSnapshot(){
    ifstream file("/proc/stat");
    string cpuLabel;
    long val, total = 0, idle = 0;

    file >> cpuLabel;
    for(int i = 0; i < 10; ++i){
        if (file >> val) {
            total += val;
        }
        if (i == 3) idle = val;
    }
    return {idle, total};
};

int main(){
    Snap s1 = takeSnapshot();
    usleep(50000);
    Snap s2 = takeSnapshot();

    float deltaTotal = s2.total - s1.total;
    float deltaIdle = s2.idle - s1.idle;

    if (deltaTotal == 0) {
        cout << "{\"usage\": " << "0%" << "}" << endl;
        return 0;
    }

    float cpuUsage = (1.0f - (deltaIdle / deltaTotal)) * 100.0f;

    cout << "{\"usage\": " << cpuUsage << "}" << endl;
};