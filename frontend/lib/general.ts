export function getUserIconColor({ number }: { number: string }) {
  switch (number) {
    case "0": return "bg-gradient-to-br from-blue-400 to-blue-700";
    case "1": return "bg-gradient-to-br from-cyan-300 to-cyan-700";
    case "2": return "bg-gradient-to-br from-gray-700 to-black";
    case "3": return "bg-gradient-to-br from-gray-400 to-gray-700";
    case "4": return "bg-gradient-to-br from-yellow-300 to-orange-500";
    case "5": return "bg-gradient-to-br from-purple-400 to-purple-700";
    default: return "bg-gradient-to-br from-red-400 to-red-700";
  }
}