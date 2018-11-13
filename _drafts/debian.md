~~~ sources.list
deb https://deb.debian.org/debian/ stretch main
deb-src https://deb.debian.org/debian/ stretch main

deb https://deb.debian.org/debian/ stretch-updates main
deb-src https://deb.debian.org/debian/ stable-updates main

deb https://deb.debian.org/debian-security/ stretch/updates main
deb-src https://deb.debian.org/debian-security stable/updates main
~~~
~~~ sources.list.d/backports.list
deb https://deb.debian.org/debian stretch-backports main
deb-src https://deb.debian.org/debian stretch-backports main
~~~

sudo apt-get -t stretch-backports install nodejs
sudo apt-get -t stretch-backports install git
sudo apt-get install xfce4-taskmanager
sudo apt-get install xfce4-terminal
sudo apt-get install gcc make libxslt-dev libxml2-dev zlib1g-dev
sudo apt-get install ruby ruby-dev bundle
