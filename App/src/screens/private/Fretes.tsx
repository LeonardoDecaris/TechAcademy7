import Constants from "expo-constants";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const statusBarHeight = Constants.statusBarHeight;

function Fretes() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    useEffect(() => {  
    }, []);

    return (
        <SafeAreaView className='flex-1 items-center '>

            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 6, marginTop: statusBarHeight + 10, paddingBottom: 130 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >

                <Text>Fretes Disponiveis</Text>

            </ScrollView>


        </SafeAreaView>

    )
}

export default Fretes;