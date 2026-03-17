import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { colors, radius, spacing } from './lib/tokens'
import { mockNews } from './constants/mock/news'
import { mockFixtures } from './constants/mock/fixtures'

// ── Shadow helper (cross-platform) ───────────────────────────────────────────

const cardShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
}

// ── Home Screen ───────────────────────────────────────────────────────────────

function HomeScreen() {
  const results = mockFixtures.filter(f => f.status === 'result')

  return (
    <View style={styles.flex}>
      {/* ── Header bar ── */}
      <View style={styles.header}>
        <View style={styles.logoPlaceholder} />
        <View style={styles.bellPlaceholder} />
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Next Match banner ── */}
        <View style={styles.nextMatchBanner}>
          <Text style={styles.nextMatchLabel}>NEXT MATCH</Text>
          <View style={styles.teamsRow}>
            <Text style={styles.teamName}>Sporting KC</Text>
            <Text style={styles.vs}>vs</Text>
            <Text style={styles.teamName}>LA Galaxy</Text>
          </View>
          <Text style={styles.matchMeta}>SAT 21 MAR · 7:30PM</Text>
          <TouchableOpacity>
            <Text style={styles.matchHub}>Match Hub →</Text>
          </TouchableOpacity>
        </View>

        {/* ── Latest News ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LATEST NEWS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newsScroll}
          >
            {mockNews.map(item => (
              <TouchableOpacity key={item.id} style={styles.newsCard} activeOpacity={0.85}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.newsImage}
                  resizeMode="cover"
                />
                <View style={styles.newsContent}>
                  <View style={styles.categoryPill}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Results ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RESULTS</Text>
          {results.map(fixture => (
            <View key={fixture.id} style={styles.resultRow}>
              <Text style={styles.competition}>{fixture.competition}</Text>
              <View style={styles.scoreRow}>
                <Text style={[styles.teamLabel, styles.textRight]} numberOfLines={1}>
                  {fixture.homeTeam}
                </Text>
                <View style={styles.scoreBadge}>
                  <Text style={styles.score}>
                    {fixture.homeScore} – {fixture.awayScore}
                  </Text>
                </View>
                <Text style={[styles.teamLabel, styles.textLeft]} numberOfLines={1}>
                  {fixture.awayTeam}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

// ── Placeholder screens ───────────────────────────────────────────────────────

function PlaceholderScreen({ name }: { name: string }) {
  return (
    <View style={styles.placeholderScreen}>
      <Text style={styles.placeholderTitle}>{name}</Text>
    </View>
  )
}

// ── News Screen ───────────────────────────────────────────────────────────────

function NewsScreen() {
  return (
    <View style={styles.flex}>
      <FlatList
        data={mockNews}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.screenHeader}>
            <Text style={styles.screenHeaderTitle}>News</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.newsListItem} activeOpacity={0.75}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.newsListImage}
              resizeMode="cover"
            />
            <View style={styles.newsListContent}>
              <View style={styles.newsListPill}>
                <Text style={styles.newsListPillText}>{item.category}</Text>
              </View>
              <Text style={styles.newsListTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.newsListDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

// ── Fixtures Screen ───────────────────────────────────────────────────────────

function FixtureRow({ fixture }: { fixture: (typeof mockFixtures)[number] }) {
  const isLive   = fixture.status === 'live'
  const isResult = fixture.status === 'result'

  const centreText = isResult || isLive
    ? `${fixture.homeScore} – ${fixture.awayScore}`
    : fixture.time

  return (
    <View style={[styles.fixtureRow, isLive && styles.fixtureRowLive]}>
      {/* Status badge + competition */}
      <View style={styles.fixtureMeta}>
        {isLive && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        )}
        {isResult && (
          <View style={styles.ftBadge}>
            <Text style={styles.ftBadgeText}>FT</Text>
          </View>
        )}
        <Text style={styles.fixtureCompetition}>{fixture.competition}</Text>
      </View>
      {/* Teams + score/time */}
      <View style={styles.fixtureTeamsRow}>
        <Text style={[styles.fixtureTeam, styles.textRight]} numberOfLines={1}>
          {fixture.homeTeam}
        </Text>
        <View style={styles.fixtureCentre}>
          <Text style={[
            styles.fixtureCentreText,
            isResult && styles.fixtureCentreResult,
            isLive   && styles.fixtureCentreLive,
          ]}>
            {centreText}
          </Text>
        </View>
        <Text style={[styles.fixtureTeam, styles.textLeft]} numberOfLines={1}>
          {fixture.awayTeam}
        </Text>
      </View>
    </View>
  )
}

function FixturesScreen() {
  return (
    <View style={styles.flex}>
      <FlatList
        data={mockFixtures}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.screenHeader}>
            <Text style={styles.screenHeaderTitle}>Fixtures &amp; Results</Text>
          </View>
        }
        renderItem={({ item }) => <FixtureRow fixture={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}
function SquadScreen()    { return <PlaceholderScreen name="Squad" /> }
function MoreScreen()     { return <PlaceholderScreen name="More" /> }

// ── Navigator ─────────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors['text-muted'],
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen name="Home"     component={HomeScreen}     options={{ tabBarIcon: () => <Text style={styles.icon}>🏠</Text> }} />
        <Tab.Screen name="News"     component={NewsScreen}     options={{ tabBarIcon: () => <Text style={styles.icon}>📰</Text> }} />
        <Tab.Screen name="Fixtures" component={FixturesScreen} options={{ tabBarIcon: () => <Text style={styles.icon}>📅</Text> }} />
        <Tab.Screen name="Squad"    component={SquadScreen}    options={{ tabBarIcon: () => <Text style={styles.icon}>👥</Text> }} />
        <Tab.Screen name="More"     component={MoreScreen}     options={{ tabBarIcon: () => <Text style={styles.icon}>☰</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: spacing[6] },

  // Header bar
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoPlaceholder: {
    width: 120,
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
  },
  bellPlaceholder: {
    width: 32,
    height: 32,
    backgroundColor: colors.surface,
    borderRadius: 16,
  },

  // Next Match banner
  nextMatchBanner: {
    backgroundColor: colors.primary,
    padding: spacing[4],
  },
  nextMatchLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.accent,
    letterSpacing: 2,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[2],
    gap: spacing[3],
  },
  teamName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.inverse,
  },
  vs: {
    fontSize: 14,
    fontWeight: '400',
    color: colors['text-muted'],
  },
  matchMeta: {
    fontSize: 13,
    color: colors['text-muted'],
    marginTop: spacing[1],
  },
  matchHub: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accent,
    marginTop: spacing[2],
  },

  // Sections
  section: {
    paddingHorizontal: spacing[4],
    marginTop: spacing[5],
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors['text-muted'],
    letterSpacing: 1.5,
    marginBottom: spacing[3],
  },

  // News cards
  newsScroll: {
    paddingRight: spacing[4],
  },
  newsCard: {
    width: 280,
    marginRight: spacing[3],
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.background,
    ...cardShadow,
  },
  newsImage: {
    width: 280,
    height: 160,
  },
  newsContent: {
    padding: spacing[3],
  },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    color: colors['text-muted'],
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing[2] - 2,
  },
  newsDate: {
    fontSize: 12,
    color: colors['text-muted'],
    marginTop: spacing[1],
  },

  // Result rows
  resultRow: {
    backgroundColor: colors.background,
    padding: spacing[4],
    borderRadius: radius.md,
    marginBottom: spacing[2],
    ...cardShadow,
  },
  competition: {
    fontSize: 11,
    color: colors['text-muted'],
    marginBottom: spacing[2],
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  textRight: { textAlign: 'right' },
  textLeft:  { textAlign: 'left' },
  scoreBadge: {
    paddingHorizontal: spacing[3],
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.accent,
  },

  // Tab bar
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  tabLabel: { fontSize: 11 },
  icon:     { fontSize: 20 },

  // Shared screen header
  screenHeader: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  screenHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },

  // News list
  newsListItem: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  newsListImage: {
    width: 120,
    height: 90,
    borderRadius: radius.sm,
  },
  newsListContent: {
    flex: 1,
    paddingLeft: spacing[3],
    justifyContent: 'center',
  },
  newsListPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newsListPillText: {
    fontSize: 10,
    color: colors['text-muted'],
  },
  newsListTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing[1],
  },
  newsListDate: {
    fontSize: 12,
    color: colors['text-muted'],
    marginTop: spacing[1],
  },

  // Fixtures
  fixtureRow: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  fixtureRowLive: {
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
  },
  fixtureMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
    gap: spacing[2],
  },
  fixtureCompetition: {
    fontSize: 11,
    color: colors['text-muted'],
  },
  liveBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ftBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ftBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors['text-muted'],
  },
  fixtureTeamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fixtureTeam: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  fixtureCentre: {
    paddingHorizontal: spacing[3],
    alignItems: 'center',
  },
  fixtureCentreText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.text,
  },
  fixtureCentreResult: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.accent,
  },
  fixtureCentreLive: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
  },

  // Placeholder screens
  placeholderScreen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
})
