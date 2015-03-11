# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # TODO: Will consider creating tech-stack specific boxes for us later.
  config.vm.box = "ubuntu-cloud-images/trusty64"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"

  # Forward server ports from guest to host
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # Required for NFS to work
  config.vm.network :private_network, type: "dhcp"

  # Use NFS for shared folders for better performance
  config.vm.synced_folder '.', '/vagrant', nfs: true
  config.vm.synced_folder "salt/roots/", "/srv/salt", nfs: true

  config.vm.provider :virtualbox do |vb|
    # Improves network speed in guest
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]

    # Increase memory and cpu usage
    vb.memory = 2048
    vb.cpus = 4
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end

  # Provision with salt
  config.vm.provision :salt do |salt|
    salt.minion_config = "salt/minion"
    salt.run_highstate = true
    salt.verbose = true
  end

end
