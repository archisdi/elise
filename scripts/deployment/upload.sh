echo "\n Uploading..."

cred=`cat .cred`

pem="$(cut -d';' -f1 <<<"$cred")"
host_folder="$(cut -d';' -f2 <<<"$cred")"

scp -i ./${pem} ./build.zip ${host_folder}