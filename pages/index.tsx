import { APIKeyInput } from '@/components/APIKeyInput';
import { CodeBlock } from '@/components/CodeBlock';
import Footer from '@/components/Footer';
import { LanguageSelect } from '@/components/LanguageSelect';
import { ModelSelect } from '@/components/ModelSelect';
import { TextBlock } from '@/components/TextBlock';
import TopBar from '@/components/TopBar';
import { OpenAIModel, TranslateBody } from '@/types/types';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<string>('JavaScript');
  const [outputLanguage, setOutputLanguage] = useState<string>('Python');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [tab, setTab] = useState(2)
  const [token, setToken] = useState(0)

  const handleTranslate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

    if (!apiKey && tab == 2) {
      Swal.fire({
        icon: 'error',
        title: 'Masukan API Key terlebih dahulu',
        text: 'Kalau kamu tidak memilikinya coba mode gratis dengan 4 kali kesempatan'
      })
      return;
    }

    if (inputLanguage === outputLanguage) {
      Swal.fire({
        title:"Pilih Bahasa Pemrograman yang berbeda",
        icon: 'info'
      })
      return;
    }

    if (!inputCode) {
      Swal.fire({
        icon:"info",
        title: 'Code masih kosong apa yang mau ditranslate?'
      })
      return;
    }

    if (inputCode.length > maxCodeLength) {
      Swal.fire({
        icon: 'info',
        title: 'Something went wrong!',
        text: `Mohon ketik code kurang dari ${maxCodeLength} karakter. Sekarang kamu mengetikan ${inputCode.length} karakter.`
      })
      return;
    }

    setLoading(true);
    setOutputCode('');

    if(tab == 1){
      setApiKey("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")
      setModel("gpt-3.5-turbo")
    }

    const controller = new AbortController();

    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey,
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'API Key gabisa digunakan pastikan token cukup'
      })
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong'
      })
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);

    // kurangi kesempatan
    if(tab == 1){
      setToken(token - 1)
      localStorage.setItem('apiKey2', JSON.stringify(token - 1))
    }
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    localStorage.setItem('apiKey', value);
  };

  useEffect(() => {
    if (hasTranslated) {
      handleTranslate();
    }
  }, [outputLanguage]);

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');

    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  useEffect(() => {
    const getToken: string | null = localStorage.getItem("apiKey2")
    if(getToken){
      setToken(getToken)
    }else{
      localStorage.setItem("apiKey2", JSON.stringify(4))
      setToken(4)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Code Translator by Zinedine</title>
        <meta
          name="description"
          content="Use AI to translate code from one language to another."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />
      <div className="flex h-full min-h-screen flex-col items-center bg-white dark:bg-gradient-to-br from-[#000000] via-[#191e29] to-[#313c52] px-4 pb-20 dark:text-neutral-200 sm:px-10">
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-4xl font-bold">Code Translator</div>
          <p className='tracking-wider text-sm'>Use AI to translate code from one language to another.</p>
        </div>

        <div className="pt-3 flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
          <button disabled={loading} onClick={() => setTab(1)} className={`${tab == 1 ? 'text-violet-500':'text-gray-500'} inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 border-transparent sm:text-sm whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 disabled:cursor-not-allowed`}>
            Coba gratis
          </button>
          <button disabled={loading} onClick={() => setTab(2)} className={`${tab == 2 ? 'text-violet-500':'text-gray-500'} inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 border-transparent sm:text-sm whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 disabled:cursor-not-allowed`}>
            Saya punya token
          </button>
        </div>

        {
          tab == 2 && (
            <>
              <div className="mt-6 text-center text-sm">
                <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
              </div>

              <div className="mt-2 flex items-center space-x-2">
                <ModelSelect model={model} onChange={(value) => setModel(value)} />

                <button
                  className="w-[140px] cursor-pointer disabled:cursor-not-allowed rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700 text-white"
                  onClick={() => handleTranslate()}
                  disabled={loading}
                >
                  {loading ? 'Translating...' : 'Translate'}
                </button>
              </div>
            </>
          )
        }

        {
          tab == 1 && (
            <div className='pt-5 flex items-center gap-5'>
              <h1 className='text-6xl font-bold'>
                {token}<span className='text-sm font-normal'>Token</span>
              </h1>
              <button
                className="w-[140px] cursor-pointer disabled:cursor-not-allowed rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700 text-white"
                onClick={() => handleTranslate()}
                disabled={loading}
              >
                {loading ? 'Translating...' : 'Translate'}
              </button>
            </div>
          )
        }

        <div className="mt-2 text-center text-xs">
          {loading
            ? 'Translating...'
            : hasTranslated
            ? 'Output copied to clipboard!'
            : tab == 2 ? 'Ketik beberapa code lalu klik "Translate"' : 'Token adalah kesempatan kamu request, mahal jadi dibatesin'}
        </div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Input</div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasTranslated(false);
                setInputCode('');
                setOutputCode('');
              }}
            />

            {inputLanguage === 'Natural Language' ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            )}
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Output</div>

            <LanguageSelect
              language={outputLanguage}
              onChange={(value) => {
                setOutputLanguage(value);
                setOutputCode('');
              }}
            />

            {outputLanguage === 'Natural Language' ? (
              <TextBlock text={outputCode} />
            ) : (
              <CodeBlock code={outputCode} />
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between container py-5 mx-auto bg-trans'>
        <h1><span className='text-sm text-zinc-400'>by</span> Zinedine</h1>

        <div className='space-x-8 flex items-center'>
          <Link href="/">
            <h1>Dukung Developer</h1>
          </Link>
          <Link href="/">
            <h1>OpenAI</h1>
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-500 lg:mt-0 dark:text-gray-400">© Copyright 2024. </p>
      </div>
      {/* <Footer /> */}
    </>
  );
}
