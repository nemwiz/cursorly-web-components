COMPONENT_NAME=$1

yarn generate $1

mv src/components/$1/test/$1.spec.tsx src/components/$1/
rm -rf src/components/$1/test

sed -e "s;%name%;$1;g" -e "s;%NAME%;$2;g" template.stories.mdx > src/components/$1/$1.stories.mdx
