interface ImageFormData {
  uri: string;
  name: string;
  type: string;
}


export const trataFormData = (uri: string): ImageFormData => {
  const nome = uri.split("/").pop() || "image.jpg";
  const match = /\.(\w+)$/.exec(nome);
  const type = match ? `image/${match[1]}` : `image`;
  return { uri, name: nome, type };
};