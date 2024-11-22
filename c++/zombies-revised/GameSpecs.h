#ifndef _gamespecs_h
#define _gamespecs_h

const int gridsize = 20; // size of the square grid
const int human_startcount = 100; // initial humans
const int zombie_startcount = 5; // initial zombie count
const int human_breed = 3; // steps until a human breeds
const int zombie_breed = 8; // steps until a zombie breeds
const int zombie_starve = 3; // steps until a zombie starves and converts back
const char human_ch = 111; // ascii for human
const char space_ch = 45; // ascii dash for empty elements
const char zombie_ch = 90; // ascii for zombie
const int intervalSetting = 300; // millisecond pause between city steps
const int iterations = 1000; // max number of steps

// Colors
const int human_color = 3; // turquoise
const int zombie_color = 14; // bright yellow
const int dash_color = 8; // pale white

#endif