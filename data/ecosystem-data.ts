import type { Node, EcosystemData } from "@/types/ecosystem"

const calculateNodePositions = (): EcosystemData => {

  const categories = [
    { id: "wallets", name: "Wallets", color: "#ffffff" },
    { id: "infrastructure", name: "Infrastructure", color: "#0079d6" },
    { id: "community", name: "Community", color: "#ffffff" },
    { id: "payments", name: "Payments", color: "#0079d6" },
    { id: "nanfts", name: "NaNFTs", color: "#ffffff" },
    { id: "gaming", name: "Gaming", color: "#0079d6" },
    { id: "merchants", name: "Merchants", color: "#ffffff" },
    { id: "developer", name: "Developer Tools", color: "#0079d6" },
    { id: "exchanges", name: "Exchanges", color: "#ffffff" },
    { id: "faucets", name: "Faucets", color: "#0079d6" },
    { id: "charity", name: "Charity", color: "#ffffff" },
    { id: "other", name: "Other", color: "#0079d6" }
  ]


  type NodeData = {
    name: string
    description: string
    url: string
    logo: string
    shape: "circle" | "rectangle"
  }


  // Add services here. Until I redesign it, each category will only support 9/10 services.
  const getCategoryNodes = (categoryId: string): NodeData[] => {
    switch (categoryId) {
      case "wallets":
        return [
          { name: "Natrium", description: "Mobile wallet", url: "https://natrium.io", logo: "/logos/natrium.svg", shape: "rectangle" },
          { name: "Nault", description: "Web/desktop wallet", url: "https://nault.cc", logo: "/logos/nault.svg", shape: "rectangle" },
          { name: "WeNano", description: "Geo-based wallet", url: "https://wenano.net", logo: "/logos/wenano.png", shape: "circle" },
          { name: "Nautilus", description: "Merchant wallet", url: "https://nautilus.io", logo: "/logos/nautilus.svg", shape: "rectangle" },
          { name: "Cake Wallet", description: "Simple wallet", url: "https://cakewallet.com", logo: "/logos/cakewallet.png", shape: "rectangle" },
          { name: "NOW Wallet", description: "Simple wallet", url: "https://walletnow.app/", logo: "/logos/nowwallet.svg", shape: "circle" },
          { name: "Trust Wallet", description: "Simple wallet", url: "https://trustwallet.com/", logo: "/logos/trustwallet.svg", shape: "circle" },
        ]
      case "infrastructure":
        return [
          { name: "Nano Node", description: "Reference node implementation", url: "https://github.com/nanocurrency/nano-node", logo: "/logos/nano.png", shape: "circle" },
          { name: "Armour Hosting", description: "Nano Node Hosting", url: "https://armour-hosting.com", logo: "/logos/armour.png", shape: "circle" },
          { name: "Nanswap Nodes", description: "Nano Nodes API", url: "https://nanswap.com/nodes", logo: "/logos/nanswap.png", shape: "circle" },
          { name: "NanExplorer", description: "Nano Network Explorer", url: "https://nanexplorer.com", logo: "/logos/nanexplorer.png", shape: "rectangle" },
          { name: "Nano.To", description: "Nano.To offers free RPC and paid PoW.", url: "https://nano.to", logo: "/logos/nanoto.png", shape: "rectangle" },
        ]
      case "community":
        return [
          { name: "SubNano", description: "Community blogging site", url: "https://subnano.me", logo: "/logos/subnano.png", shape: "circle" },
          { name: "Nano Market", description: "Escrow-using marketplace", url: "https://market.nanoriver.io/", logo: "/logos/nanomarket.png", shape: "circle" },
          { name: "BrainBook", description: "Pay-to-Read with Nano", url: "https://www.brainbook.me/", logo: "/logos/brainbook.svg", shape: "circle" },
          { name: "The Nano Foundation", description: "Official foundation", url: "https://nano.org", logo: "/logos/nano.png", shape: "circle" },
          { name: "r/nanocurrency", description: "Reddit community", url: "https://reddit.com/r/nanocurrency", logo: "/logos/reddit.png", shape: "circle" },
          { name: "Nano Discord", description: "Discord community", url: "https://chat.nano.org", logo: "/logos/discord.png", shape: "circle" },
        ]
      case "payments":
        return [
          { name: "PayNano", description: "Payment processor", url: "https://paynano.me", logo: "/logos/paynanome.svg", shape: "rectangle" },
          { name: "NOWPayments", description: "Crypto payment gateway", url: "https://nowpayments.io", logo: "/logos/nowpayments.svg", shape: "rectangle" },
          { name: "XNOPay", description: "Payment processor", url: "https://xnopay.com", logo: "/logos/xnopay.svg", shape: "rectangle" },
          { name: "Kappture", description: "Payment processor", url: "https://www.kappture.co.uk/", logo: "/logos/kappture.svg", shape: "rectangle" },
          { name: "NanoPay", description: "Inspired by Apple Pay, NanoPay.js is an open source, non-custodial browser library for the Nano blockchain.", url: "https://docs.nano.to/nanopay", logo: "/logos/nanopay.png", shape: "rectangle" },
        ]
      case "nanfts":
        return [
          { name: "Raistone OGs", description: "RaiStone OGs, 50 Rai Stones powered by Nano!", url: "https://nanswap.com/art/collection/raistones", logo: "/logos/raistoneogs.png", shape: "circle" },
          { name: "Nano Bots", description: "Community made robot-based artwork.", url: "https://nano-bots.xyz", logo: "/logos/nanobots.png", shape: "circle" },
          { name: "Broccoli Bros", description: "Broccoli-based art collection", url: "https://broccolish.xyz/", logo: "/logos/broccolibros.png", shape: "circle" },
          { name: "Numb Dawgs", description: "Numb to the charts, wise to the tech. Can't teach an old dawg new tricks. Accumulate.", url: "https://nanswap.com/art/collection/numbdawgs", logo: "/logos/numbdawgs.png", shape: "circle" },
        ]
      case "gaming":
        return [
          { name: "Nanogotchi", description: "Old school Tamagotchi style game with Nano and NaNFT features", url: "https://nanogotchi.com/", logo: "/logos/nanogotchi.png", shape: "circle" },
          { name: "CryptoVision", description: "Video streaming faucet with nano payouts", url: "https://cryptovision.live/", logo: "/logos/cryptovision.png", shape: "rectangle" },
          { name: "XNO Treasure", description: "Play Nano Treasure Hunt. Free Nano Every Day", url: "https://xnoxno.com/treasure/", logo: "/logos/xnoxno.png", shape: "rectangle" },
          { name: "Unreal Nano", description: "Enjoy a relaxing atmosphere and interact with the magic nano tree, visualizer and more - includes VR support", url: "https://unreal.nanos.cc/", logo: "/logos/unrealnano.svg", shape: "rectangle" },
        ]
      case "merchants":
        return [
          { name: "WeNano Spots", description: "WeNano is a new way to utilize and experience digital money.", url: "https://wenano.net", logo: "/logos/wenano.png", shape: "circle" },
          { name: "Armour Hosting", description: "Secure, scalable web and server hosting.", url: "https://armour-hosting.com", logo: "/logos/armour.png", shape: "circle" },
          { name: "Nano-GPT", description: "Pay-per-prompt AI Platform", url: "https://nano-gpt.com", logo: "/logos/nanogpt.png", shape: "circle" },
          { name: "NanShop", description: "Buy gift cards with Nano", url: "https://nanswap.com/shop", logo: "/logos/nanswap.png", shape: "circle" },
          { name: "Travala", description: "Book vacations using Nano", url: "https://travala.com", logo: "/logos/travala.png", shape: "circle" },
        ]
      case "developer":
        return [
          { name: "Nano Casa", description: "nano.casa monitors the open source development of the nano ecosystem", url: "https://nano.casa", logo: "/logos/nanocasa.png", shape: "rectangle" },
          { name: "Pippin", description: "A production-ready, high-performance developer wallet for Nano.", url: "https://github.com/appditto/pippin_nano_wallet", logo: "/logos/pippin.png", shape: "rectangle" },
          { name: "KeyTools", description: "A set of high performance web tools for Nano", url: "https://tools.nanos.cc/", logo: "/logos/keytools.png", shape: "circle" },
          { name: "Unreal Engine 4 Plugin", description: "Unreal Engine 4 Plugin", url: "https://github.com/wezrule/UE4NanoPlugin", logo: "/logos/ue4.png", shape: "circle" },
          { name: "Unity Nano Plugin", description: "Unity Nano Plugin", url: "https://github.com/wezrule/UnityNanoPlugin", logo: "/logos/unity.png", shape: "rectangle" },
          { name: "NanoGPT JS", description: "Interact with NanoGPT's API for pay-per-prompt interaction with AI models", url: "https://github.com/kilkelly/nanogptjs", logo: "/logos/nanogptjs.png", shape: "circle" },
        ]
      case "exchanges":
        return [
          { name: "Binance", description: "Cryptocurrency exchange", url: "https://binance.com", logo: "/logos/binance.svg", shape: "circle" },
          { name: "OKX", description: "Cryptocurrency exchange", url: "https://okx.com", logo: "/logos/okx2.svg", shape: "circle" },
          { name: "Crypto.Com", description: "Cryptocurrency exchange", url: "https://crypto.com", logo: "/logos/cryptocom.svg", shape: "circle" },
          { name: "BitVavo", description: "Cryptocurrency exchange", url: "https://bitvavo.com", logo: "/logos/bitvavo.svg", shape: "circle" },
          { name: "Kraken", description: "Cryptocurrency exchange", url: "https://kraken.com", logo: "/logos/kraken-wide.svg", shape: "rectangle" },
          { name: "KuCoin", description: "Cryptocurrency exchange", url: "https://kucoin.com", logo: "/logos/kucoin-wide.svg", shape: "rectangle" },
          { name: "Gate.io", description: "Cryptocurrency exchange", url: "https://www.gate.io/", logo: "/logos/gateio.png", shape: "rectangle" },
          { name: "HTX", description: "Cryptocurrency exchange", url: "https://www.htx.com/", logo: "/logos/htx.png", shape: "circle" },
          { name: "Nanswap", description: "Cryptocurrency exchange", url: "https://nanswap.com?r=Armour", logo: "/logos/nanswap-dark.svg", shape: "rectangle" },
          // { name: "ChangeNOW", description: "Cryptocurrency exchange", url: "https://changenow.io/en", logo: "/logos/changenow.webp", shape: "circle" },
        ]
      case "faucets":
        return [
          { name: "NanoDrop", description: "Free Nano distribution", url: "https://nanodrop.io", logo: "/logos/nanodrop.png", shape: "circle" },
          { name: "WeNano Faucet", description: "Location-based faucet", url: "https://wenano.net", logo: "/logos/wenano.png", shape: "circle" },
          { name: "XNOPay Faucet", description: "Daily Nano rewards", url: "https://xnopay.com", logo: "/logos/xnopay.svg", shape: "rectangle" },
          { name: "Nanswap Faucet", description: "Daily Nano rewards", url: "https://nanswap.com/nano-faucet", logo: "/logos/nanswap-dark.svg", shape: "rectangle" },
          { name: "NanoFaucet", description: "Nano rewards every 45 minutes", url: "https://nano.lol.my.id/", logo: "/logos/nanofaucet.png", shape: "rectangle" },
        ]
      case "charity":
        return [
          { name: "The Humane League", description: "Animal Cruelty Prevention", url: "https://thehumaneleague.org/donate-cryptocurrencies", logo: "/logos/thehumaneleague.svg", shape: "circle" },
          { name: "Crypto For The Homeless", description: "Humanitarian projects", url: "https://cryptoforthehomeless.com/", logo: "/logos/cryptoforthehomeless.png", shape: "circle" },
          { name: "Nim Lang", description: "Non-profit language support", url: "https://nim-lang.org/donate.html", logo: "/logos/nim.svg", shape: "rectangle" },
          { name: "Beer Harris Memorial Trust", description: "Mental Health support", url: "https://beerharrismemorialtrust.org/", logo: "/logos/bhmt.png", shape: "rectangle" },
          { name: "Wolfdog Rescue", description: "Wolfdog Refuge", url: "https://www.wolfdogrescue.org/donate-crypto/?v=7885444af42e", logo: "/logos/wolfdog.png", shape: "rectangle" },
        ]
      case "other":
        return [
          { name: "Nano Charts", description: "Community resources", url: "https://nanocharts.info", logo: "/logos/nanocharts.png", shape: "rectangle" },
          { name: "KarmaCall", description: "Get paid in Nano to block spam calls", url: "https://www.karmacall.com/", logo: "/logos/karmacall.webp", shape: "circle" },
          { name: "CoinGecko", description: "CoinGecko", url: "https://www.coingecko.com/en/coins/nano", logo: "/logos/coingecko.png", shape: "circle" },
          { name: "CoinMarketCap", description: "CoinMarketCap", url: "https://coinmarketcap.com/currencies/nano/", logo: "/logos/coinmarketcap.png", shape: "circle" },
          { name: "XNO Xperience", description: "Compare a transaction across different cryptocurrencies and payment processors.", url: "https://xnoxno.com/xperience/", logo: "/logos/xnoxno.png", shape: "rectangle" },
          { name: "TipNano", description: "Android app that allows earning payouts in nano by performing tasks such as playing games", url: "https://play.google.com/store/apps/details?id=com.bdf.tipnano", logo: "/logos/tipnano.png", shape: "circle" },
        ]
      default:
        return []
    }
  }

  const totalNodes = categories.reduce((sum, category) => {
    return sum + (getCategoryNodes(category.id)?.length || 0)
  }, 0)
  const baseCategoryRadius = Math.max(1, 0.8 + totalNodes * 0.02)

  const categoryPositions = categories.map((category, index) => {
    const angleStep = (2 * Math.PI) / categories.length
    const angle = index * angleStep
    return {
      categoryId: category.id,
      x: 0.5 + baseCategoryRadius * Math.cos(angle),
      y: 0.5 + baseCategoryRadius * Math.sin(angle)
    }
  })

  const nodes: Node[] = []


  categories.forEach((category, categoryIndex) => {
    const categoryNodes = getCategoryNodes(category.id)
    const catNode = categoryPositions[categoryIndex]
    const baseNodeRadius = 0.35 
    const angleStep = (2 * Math.PI) / Math.max(categoryNodes.length, 1)
    const radiusStep = categoryNodes.length > 5 ? 0.08 : 0.06 
    const maxRadius = baseNodeRadius + radiusStep * Math.ceil(categoryNodes.length / 3) 

    categoryNodes.forEach((nodeData, nodeIndex) => {
      const angle = nodeIndex * angleStep
      const radius = baseNodeRadius + radiusStep * Math.floor(nodeIndex / 3) 
      const jitterX = Math.random() * 0.02 - 0.01
      const jitterY = Math.random() * 0.02 - 0.01

      const x = catNode.x + Math.min(radius, maxRadius) * Math.cos(angle) + jitterX
      const y = catNode.y + Math.min(radius, maxRadius) * Math.sin(angle) + jitterY

      nodes.push({
        id: `${category.id}-${nodeIndex}`,
        name: nodeData.name,
        categoryId: category.id,
        description: nodeData.description,
        url: nodeData.url,
        logo: nodeData.logo,
        x,
        y,
        shape: nodeData.shape
      })
    })
  })

  return { categories, categoryNodes: categoryPositions, nodes }
}

export const ecosystemData = calculateNodePositions()
