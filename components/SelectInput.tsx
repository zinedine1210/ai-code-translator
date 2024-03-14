import { useEffect, useRef, useState } from "react"

export default function SelectInput({ handleChangeOption, value }) {
    const [open, setOpen] = useState(false)
    const dropRef = useRef(null)
    const [options, setOptions] = useState([])
    const [keyword, setKeyword] = useState('')

    const handleOutsideClick = (event: Event) => {
        if (dropRef.current && !dropRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [])

    
  return (
    <div ref={dropRef} className="relative">
        <button>

        </button>

        <div className={`${open ? "visible scale-100":"invisible scale-0"} z-20 ease-in-out duration-300 origin-top absolute top-full right-0 w-full shadow-md rounded-b-md bg-white dark:bg-black dark:border-2 dark:border-white/20 h-fit max-h-[250px] overflow-hidden hover:overflow-y-auto`}>
            <div className="mb-2 p-2">
                <input type="text" value={keyword} className="input-style w-full" onChange={e => setKeyword(e.target.value)} placeholder="Search by label"/>
            </div>

            {
                options && options.length > 0 ? options.filter(res => {
                    if(!res['label'].toLowerCase().includes(keyword.toLowerCase())){
                        return false
                    }
                    return res
                }).map((item, index) => {
                    return (
                        <button type="button" key={index} className={`${item['value'] == value ? "bg-blue-400":""} duration-300 text-start py-1 px-2 hover:bg-blue-100 dark:hover:bg-dark2 text-sm w-full `} onClick={() => handleChangeOption(item['value'])}>
                            {item['label']}
                        </button>
                    )
                })
                :
                "Nothing Select"
            }
        </div>
    </div>
  )
}
