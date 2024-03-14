import { useRef, type FC, useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface Props {
  language: string;
  onChange: (language: string) => void;
}

export const LanguageSelect: FC<Props> = ({ language, onChange }) => {
  const [open, setOpen] = useState(false)
  const dropRef = useRef(null)
  const [options, setOptions] = useState([])
  const [keyword, setKeyword] = useState('')

  const handleOutsideClick = (event: Event) => {
      if (dropRef.current) {
        setOpen(false);
      }
  };

  useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
      };
  }, [])


  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div ref={dropRef} className="relative">
        <button onClick={() => setOpen(!open)} className='flex items-center justify-between w-full bg-black text-white py-2 px-5 rounded-md'>
          {language}
          <BiChevronDown className='text-2xl'/>
        </button>

        <div className={`${open ? "visible scale-100":"invisible scale-0"} z-20 ease-in-out duration-300 origin-top absolute top-full right-0 w-full shadow-md rounded-b-md backdrop-blur-md dark:bg-black dark:border-2 dark:border-white/20 h-fit max-h-[250px] overflow-hidden hover:overflow-y-auto`}>
            <div className="mb-2 p-2">
                <input type="text" value={keyword} className="input-style w-full" onChange={e => setKeyword(e.target.value)} placeholder="Search by label"/>
            </div>

            {
                languages && languages.length > 0 ? languages
                .sort((a, b) => a.label.localeCompare(b.label))
                .filter(res => {
                    if(!res['label'].toLowerCase().includes(keyword.toLowerCase())){
                        return false
                    }
                    return res
                }).map((item, index) => {
                    return (
                        <button type="button" key={index} className={`${item['value'] == language ? "bg-blue-400":""} text-white duration-300 text-start py-1 px-2 hover:bg-blue-500 dark:hover:bg-dark2 text-sm w-full `} onClick={() => handleChange(item.value)}>
                            {item['label']}
                        </button>
                    )
                })
                :
                "Nothing Language"
            }
        </div>
    </div>
  );
};

const languages = [
  { value: 'Pascal', label: 'Pascal' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Python', label: 'Python' },
  { value: 'TSX', label: 'TSX' },
  { value: 'JSX', label: 'JSX' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Go', label: 'Go' },
  { value: 'C', label: 'C' },
  { value: 'C++', label: 'C++' },
  { value: 'Java', label: 'Java' },
  { value: 'C#', label: 'C#' },
  { value: 'Visual Basic .NET', label: 'Visual Basic .NET' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Assembly Language', label: 'Assembly Language' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'Swift', label: 'Swift' },
  { value: 'SwiftUI', label: 'SwiftUI' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'R', label: 'R' },
  { value: 'Objective-C', label: 'Objective-C' },
  { value: 'Perl', label: 'Perl' },
  { value: 'SAS', label: 'SAS' },
  { value: 'Scala', label: 'Scala' },
  { value: 'Dart', label: 'Dart' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Haskell', label: 'Haskell' },
  { value: 'Lua', label: 'Lua' },
  { value: 'Groovy', label: 'Groovy' },
  { value: 'Elixir', label: 'Elixir' },
  { value: 'Clojure', label: 'Clojure' },
  { value: 'Lisp', label: 'Lisp' },
  { value: 'Julia', label: 'Julia' },
  { value: 'Matlab', label: 'Matlab' },
  { value: 'Fortran', label: 'Fortran' },
  { value: 'COBOL', label: 'COBOL' },
  { value: 'Bash', label: 'Bash' },
  { value: 'Powershell', label: 'Powershell' },
  { value: 'PL/SQL', label: 'PL/SQL' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Racket', label: 'Racket' },
  { value: 'HTML', label: 'HTML' },
  { value: 'NoSQL', label: 'NoSQL' },
  { value: 'Natural Language', label: 'Natural Language' },
  { value: 'CoffeeScript', label: 'CoffeeScript' },
];
