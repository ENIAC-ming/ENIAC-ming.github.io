# Configurations

## conky
```lua
-- vim: ts=4 sw=4 noet ai cindent syntax=lua


conky.config = {
    alignment = 'top_right',
    background = yes,
    border_width = 0.5,
    cpu_avg_samples = 4,
    default_color = 'white',
    default_outline_color = 'grey',
    default_shade_color = 'black',
    double_buffer = true,
    draw_borders = true,
    draw_graph_borders = true,
    draw_outline = flase,
    draw_shades = false,
    use_xft = true,
    font = 'DejaVu Sans Mono:size=12',
    gap_x = 5,
    gap_y = 15,
    minimum_height = 5,
    minimum_width = 5,
    net_avg_samples = 2,
    double_buffer = true,
    out_to_console = false,
    out_to_stderr = false,
    extra_newline = false,
    own_window = true,
    own_window_colour = '000000',
    own_window_class = 'normal',
    own_window_argb_visual = true,
    own_window_argb_value = 90,
    own_window_argb_count = 0,
    own_window_type = 'desktop',
    own_window_transparent = false,
    own_window_hints = 'undecorated,below,sticky,skip_taskbar,skip_pager',
    stippled_borders = 0,
    update_interval = 1.5,
    uppercase = false,
    use_spacer = 'none',
    show_graph_scale = false,
    show_graph_range = false
}

conky.text = [[
${texeci 1800 curl wttr.in/Pengjiang_0pq_lang=en.png | convert - -transparent black $HOME/.config/conky/out.png}
${image $HOME/.config/conky/out.png -p 0,0 -n}



# ${image $HOME/.config/conky/face.png -p 20,5 -s 70x70 -f 86400}
${font Noto Sans:bold:size=8}${alignr}    ${exec hostnamectl | grep System | cut -c19-40}
${font Noto Sans:bold:size=8}${alignr}    ${exec hostnamectl | grep Architecture | cut -c5-30}
${font Latin Modern Mono Caps:bold:size=14}${alignr}${color 00ffae}   ${exec hostnamectl | grep Kernel | cut -c11-32}
${font Entopia:bold:size=12}${color 33E9FF}PERFORMANCE ${hr 2}${font}
${offset 15}${color FFFDE2}System Uptime ${alignr}$color $uptime
${offset 15}${color FFFDE2}RAM :$color $mem $memperc% ${color yellow}${membar 4}
${offset 15}${color FFFDE2}Swap:$color $swap/$swapmax $swapperc% ${color yellow}${swapbar 4}
${color FFFDE2}
${offset 15}Frequency: ${alignr}${freq dyn} MHz
${offset 15}Core 1   ${color ff8300}${cpubar cpu1 6}${color FFFDE2}
${offset 15}Core 2   ${color ff8300}${cpubar cpu2 6}${color FFFDE2}
${offset 15}Core 3   ${color ff8300}${cpubar cpu3 6}${color FFFDE2}
${offset 15}Core 4   ${color ff8300}${cpubar cpu4 6}${color FFFDE2}
${offset 15}${font}${color FFFDE2}Procs:$color $processes  ${color FFFDE2}Run:$color $running_processes Temp: ${acpitemp}°C

${font Entopia:bold:size=12}${color green}NETWORK ${hr 2}${font DejaVu Sans Mono:size=9}
${offset 15}${color}Ext IP Addr ${color red}${alignr}${exec curl "http://ip-api.com/json/" | jq "[.regionName, .city, .query]" | jq 'join(";")'}
${offset 15}${color}IPv4 Addr ${color red}${alignr}${addr enp5s0}
${offset 15}${color green}${font}▼ $color${totaldown enp5s0} ${alignr}${color green}▲ $color${totalup enp5s0}
# ${offset 5}${font Entopia:bold:size=12}${color orange}${wireless_essid enp5s0} ${stippled_hr 1}
# ${offset 15}${color}${font DejaVu Sans Mono:size=9}WiFi ${alignr}${wireless_link_qual_perc 
# wlan1}%(${wireless_link_qual wlan1}/${wireless_link_qual_max wlan1}) ${color red}${addr wlan1}
# ${offset 15}${font}${color green}▼ $color${totaldown wlan1} ${alignr}${color green}▲ $color${totalup wlan1}

${font Entopia:bold:size=12}${color red}PROCESSES ${hr 2}
${offset 15}${font Noto sans:size=8}${color EDE0FF}Name               ${alignr}PID   CPU%   MEM%
${offset 15}${color FF7878}${top name 1} ${alignr}${top pid 1} ${top cpu 1} ${top mem 1}
${offset 15}${color FF7878}${top name 2} ${alignr}${top pid 2} ${top cpu 2} ${top mem 2}
${offset 15}${color FF7878}${top name 3} ${alignr}${top pid 3} ${top cpu 3} ${top mem 3}
${offset 15}${color FF7878}${top name 4} ${alignr}${top pid 4} ${top cpu 4} ${top mem 4}
${offset 15}${color FF7878}${top name 5} ${alignr}${top pid 5} ${top cpu 5} ${top mem 5}
${offset 15}${color FF7878}${top name 6} ${alignr}${top pid 6} ${top cpu 6} ${top mem 6}
${offset 15}${color FF7878}${top name 7} ${alignr}${top pid 7} ${top cpu 7} ${top mem 7}
${offset 15}${color FF7878}${top name 8} ${alignr}${top pid 8} ${top cpu 8} ${top mem 8}
${offset 15}${color FF7878}${top name 9} ${alignr}${top pid 9} ${top cpu 9} ${top mem 9}

${font Entopia:bold:size=12}${color 7cfc00} DISKINFO ${hr 2}
${offset 15}${color 7cfc00}disk : ${diskio}
${offset 15}${color 7cfc00}diskGraph : ${diskiograph}
${offset 15}${color 7cfc00}Root partition: ${alignr}${fs_free /} /${fs_size /}

${font Entopia:bold:size=12}${color 33E9FF}END ${hr 2}${font}
]]
```
> ### Reference
> 
> [[经验漫谈]Linux的系统监控软件——Conky](https://mp.weixin.qq.com/s/75eRQoskrwl5XnFwf_3pGw)