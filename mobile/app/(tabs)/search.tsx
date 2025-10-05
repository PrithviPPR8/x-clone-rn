import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"

const TRENDING_TOPICS = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#BuildInPublic", tweets: "872K" },
  { topic: "#TypeScript", tweets: "89K" },
  { topic: "#WebDevelopment", tweets: "234K" },
  { topic: "#AI", tweets: "567K" },
  { topic: "#TechNews", tweets: "96K" },
  { topic: "#StartupCommunity", tweets: "323K" },
  { topic: "#JavaScript", tweets: "123K" },
  { topic: "#Redux", tweets: "223K" },
  { topic: "#React", tweets: "523K" },
  { topic: "#SaaS", tweets: "423K" },
  { topic: "#NextJS", tweets: "723K" },
  { topic: "#TailwindCSS", tweets: "232K" },
  { topic: "#BaaS", tweets: "23K" },
]

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTopics, setFilteredTopics] = useState(TRENDING_TOPICS);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        const filtered = TRENDING_TOPICS.filter(item =>
          item.topic.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTopics(filtered);
      } else {
        setFilteredTopics(TRENDING_TOPICS);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            placeholder="Search Twitter"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            {searchTerm.trim() ? "Search Results" : "Trending for you"}
          </Text>

          {filteredTopics.length > 0 ? (
            filteredTopics.map((item, index) => (
              <TouchableOpacity key={index} className="py-3 border-b border-gray-100">
                <Text className="text-gray-500 text-sm">Trending in Technology</Text>
                <Text className="font-bold text-gray-900 text-lg">{item.topic}</Text>
                <Text className="text-gray-500 text-sm">{item.tweets} Tweets</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-5">No results found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen
