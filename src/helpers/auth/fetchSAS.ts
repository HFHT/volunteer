export async function fetchSAS() {
    try {
      const { url, sasKey } = await (await fetch(`${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTSasToken?cont=habistorepickup`)).json();
      return { url, sasKey };
    } catch (error: any) { console.log(error); return null }
  }