import { useEffect, useState } from "react"
import { useAuctionsCatalogStore } from "../store/auctionStore"
import type { Auction, Category } from "../interfaces/auctionInterface"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router"
import { useShowNoti } from "../context/notificationContext"

export const useAuctionsCatalog = () => {
  const {
    auctions,
    pinnedAuctions,
    auctionsHistory,
    auctionsStates,
    bidTypes,
    categories,
    isLoading,
    error,
    fetchData,
    savePin,
    removePin
  } = useAuctionsCatalogStore((state) => state)
  const user = useAuthStore((state) => state.user)
  const { sendError } = useShowNoti()
  const navigate = useNavigate()

  const [filteredCatalog, setFilteredCatalog] = useState<Auction[]>([])
  const [pinnedCatalog, setPinnedCatalog] = useState<Auction[]>([])

  const [productFilter, setProductFilter] = useState<string>("")
  const [bidTypeFilter, setBidTypeFilter] = useState<string | null>(null)
  const [categoriesFilter, setCategoriesFilter] = useState<Category[]>([])
  const [auctionsStateFilter, setAuctionsStateFilter] = useState<string | null>(null)

  const navAuction = (auctionId: string) => {
    navigate(`auctionRoom/${auctionId}`)
  }

  const pinActions = (auction: Auction) => {

    if (pinnedCatalog.includes(auction)) {
      const existingPin = pinnedAuctions.find(p => p.auctionId === auction.id);
      if (existingPin) {
        removePin(existingPin.id);
      }
    } else {
      if (pinnedAuctions.length > 3) {
        sendError("No puedes fijar más de 4 publicaciones")
        return;
      }
      savePin(user.id, auction.id)
    }
  }

  const loadData = async () => {
    await fetchData(user.id)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let catalog = auctions;
    if (bidTypeFilter) {
      catalog = catalog.filter((auction) => auction.bidType === bidTypeFilter)
    }
    if (categoriesFilter.length > 0) {
      catalog = catalog.filter((auction) =>
        auction.product.categories.some((cat) =>
          categoriesFilter.some((filterCat) => filterCat.name === cat)
        )
      )
    }
    if (auctionsStateFilter) {
      catalog = catalog.filter((auction) => auction.state === auctionsStateFilter)
    }
    if (productFilter.trim().length > 0) {
      catalog = catalog.filter((auction) => auction.product.name.toLowerCase().startsWith(productFilter.toLowerCase()))
    }
    setFilteredCatalog(catalog);
  }, [bidTypeFilter, categoriesFilter, auctionsStateFilter, productFilter])

  useEffect(() => {
    const pinnedIds = new Set(pinnedAuctions.map(p => p.auctionId));
    const pinned = auctions.filter((auction) => pinnedIds.has(auction.id))
    setPinnedCatalog(pinned)
  }, [pinnedAuctions])

  useEffect(() => {
    setFilteredCatalog(auctions)
  }, [auctions])

  return {
    data: {
      filteredCatalog,
      pinnedCatalog,
      auctionsHistory
    },
    filterData: {
      auctionsStates,
      bidTypes,
      categories,
    },
    filters: {
      productFilter,
      bidTypeFilter,
      categoriesFilter,
      auctionsStateFilter,
      setProductFilter,
      setBidTypeFilter,
      setCategoriesFilter,
      setAuctionsStateFilter
    },
    pinActions,
    navAuction,
    error,
    isLoading
  }
}