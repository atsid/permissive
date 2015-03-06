npmdeps:
  cmd.run:
    - name: npm install
    - user: vagrant
    - group: vagrant
    - cwd: /vagrant


devaliases:
  file.append:
    - name: /home/vagrant/.bashrc
    - text:
      - "alias gulp='node /vagrant/node_modules/.bin/gulp'" 
      - "alias bower='node /vagrant/node_modules/.bin/bower'"