import { ChangeEvent } from "react";




interface InputProps{
    type:string,
    placeholder:string,
    label:string,
    name?:string,
    value?:string,
    error?:boolean,
    classname:string,
    onChange:(e: ChangeEvent<HTMLInputElement>) => void
}


export const InputBox: React.FC<InputProps> = ({
    type,placeholder,label,name,value,error,onChange,classname
}) => {
    return <div className="mb-4">
        <label className="block text-sm font-medium font-extrabold  pl-1   mb-1" >{label}</label>
        <input 
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            className={`w-full p-2 border ${error ? 'border-red-200' : 'border-slate-200 '} rounded-md text-black`}
        />
        { error && <span    className="text-red-400 text-sm mt-1" >Error: Invalid input</span>  }
    </div>
}

export default InputBox;