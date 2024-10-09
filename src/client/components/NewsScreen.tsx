import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';
import { getAllNews } from '../services/newsService'; 

interface NewsItem {
  id: number;
  title: string;
  image: string;
  content: string;
  createdAt: string;
  author: {
    firstName: string;
  };
  category: {
    name: string;
    color: string;
  };
}

const NewsScreen = () => {
  const [allNewsData, setAllNewsData] = useState<NewsItem[]>([]); 
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastNewsId, setLastNewsId] = useState<number | null>(null);

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  const sendPushNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: true,
      },
      trigger: null,
    });
  };

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); 
      try {
        const data = await getAllNews(0, 6);
        setAllNewsData(data.data); 
        setNewsData(data.data);
        if (data.data.length > 0) {
          const latestNewsId = data.data[0].id;
          if (lastNewsId !== null && latestNewsId !== lastNewsId) {
            await sendPushNotification('News Available!', data.data[0].title);
          }
          setLastNewsId(latestNewsId); 
        }

      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchNews();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Response:', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [lastNewsId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query === '') {
      setNewsData(allNewsData);
    } else {
      const filtered = allNewsData.filter((item) =>
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(query.toLowerCase())
      );
      setNewsData(filtered);
    }
  };

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Image
        style={styles.newsImage}
        source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
      />
      <View style={styles.newsFooter}>
        <Text style={[styles.categoryBadge, { backgroundColor: item.category.color || '#8E44AD' }]}>
          {item.category.name}
        </Text>
        <Text style={styles.newsDate}>
          By {item.author.firstName}, {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="grey" style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor="grey"
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="rgb(236, 127, 85)" />
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNewsItem}
          ListEmptyComponent={<Text style={styles.noNewsText}>No news found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noNewsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7B7B7B',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  newsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    fontSize: 12,
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  newsDate: {
    fontSize: 12,
    color: '#7B7B7B',
  },
});

export default NewsScreen;
