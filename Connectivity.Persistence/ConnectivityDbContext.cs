using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;
using Connectivity.Persistence.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Connectivity.Persistence
{
    public class ConnectivityDbContext : DbContext
    {
        public DbSet<Lobby> Lobbies { get; set; }
        
        public DbSet<Card> Cards { get; set; }

        public ConnectivityDbContext()
        {
        }

        public ConnectivityDbContext(DbContextOptions<ConnectivityDbContext> contextOptions)
            : base(contextOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Lobby>()
                .ToContainer("lobbies")
                .HasNoDiscriminator();

            modelBuilder.Entity<Card>()
                .ToContainer("cards")
                .HasNoDiscriminator();

            modelBuilder.Entity<Lobby>(lobby =>
            {
                lobby.Property(_ => _.CardDeck)
                    .HasJsonConversion();

                lobby.OwnsOne(_ => _.Game, game =>
                {
                    game.OwnsOne(_ => _.PlayerTurnState);
                });

                lobby.OwnsMany(_ => _.Teams);

                lobby.OwnsMany(_ => _.Players);
            });

            modelBuilder.Entity<Card>(gameCard =>
            {
                gameCard.OwnsOne(_ => _.Task, gameCardTask =>
                {
                    gameCardTask.Property(_ => _.Questions)
                        .HasJsonConversion();

                    gameCardTask.Property(_ => _.BannedWords)
                        .HasJsonConversion();
                });
            });
        }
    }
}