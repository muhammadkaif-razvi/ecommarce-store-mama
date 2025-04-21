"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvtarProps {
  name: string;
  image: string;
}
const UserAvtar: React.FC<UserAvtarProps> = ({
  name,
  image,
  
}) => {
  return (
<>
<Avatar className="h-8 w-8  rounded-lg">
                            <AvatarImage
                              src={image || ""}
                              alt={name || "User"}
                            />
                            <AvatarFallback className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white rounded-lg flex items-center justify-center w-full h-full text-sm font-medium transition-colors">
                              {name
                                ?.split(" ")[0]
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
</>  )
}

export default UserAvtar