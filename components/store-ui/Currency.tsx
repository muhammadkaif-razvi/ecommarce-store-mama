"use client"
import { formatter } from "@/lib/utils"
import { useEffect, useState } from "react"

interface CurrencyProps {
  value?: string | number
}

const Currency: React.FC<CurrencyProps> = ({
  value ,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  
  return (
    <span className='font-semibold'>
      {formatter.format(Number(value))}
    </span>
  )
}

export default Currency