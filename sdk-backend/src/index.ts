import 'dotenv/config';

const new_name = async (name_param: string, counter = 0): Promise<string> => {
    const newName = name_param + "Emmanuel";
  
    if (counter >= 20) {
      return newName;
    }
  
    return new_name(newName, counter + 1);
};
  
  const result = await new_name("Asaolu");
  console.log("result:", result);
  