# Z-Way Virtual Switch
Z-Way Home Automation module which provides one virtual switch devices from two toggle button devices.

The virtual switch device type can be configured as standard 'Binary Switch' or 'Door Lock'.

Requires two toggle buttons:
 - Button to push when switch to 'open' (on).
 - Button to push when switch to 'close' (off).

See: [z-wave.me/z-way](https://z-wave.me/z-way/)

## Instalation

```shell
$ cd /opt/z-way-server/automation/userModules
$ sudo git clone https://github.com/latchdevel/VirtualSwitch.git
$ sudo systemctl restart z-way-server.service
```

# License
Copyright (c) 2022 Jorge Rivera. All right reserved.

License GNU Lesser General Public License v3.0.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program; if not, write to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

See the [LICENSE](LICENSE.txt) file for license rights and limitations (lgpl-3.0).