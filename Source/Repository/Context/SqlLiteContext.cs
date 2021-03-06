﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Imglib.Repository.Table;
using Microsoft.Data.Sqlite;

namespace Imglib.Repository.Context
{
	public class SqlLiteContext : DbContext, IDisposable
	{
		protected readonly string _location;

		internal DbSet<Image> Images { get; set; }
		internal DbSet<Rating> Ratings { get; set; }
		internal DbSet<Tag> Tags { get; set; }
		internal DbSet<ImageTag> ImageTags { get; set; }

		public SqlLiteContext(string folder, string filename)
		{
			_location = Path.Combine(folder, filename);

			Database.EnsureCreated();
			Database.Migrate();
		}

		public void DetachAll()
		{
			foreach (var item in ChangeTracker.Entries())
			{
				item.State = EntityState.Detached;
			}
		}

		private SqliteConnection CreateConnection()
		{
			return new SqliteConnection
			{
				ConnectionString = new SqliteConnectionStringBuilder { DataSource = _location }.ToString()
			};
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlite(CreateConnection());
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			#region Tables

			modelBuilder.Entity<Image>()
				.ToTable("Images");

			modelBuilder.Entity<Rating>()
				.ToTable("Ratings");

			modelBuilder.Entity<Tag>()
				.ToTable("Tags");

			modelBuilder.Entity<ImageTag>()
				.ToTable("ImageTags");

			#endregion

			#region Primary keys

			modelBuilder.Entity<Image>()
				.HasKey(x => x.Id);

			modelBuilder.Entity<Rating>()
				.HasKey(x => x.Id);

			modelBuilder.Entity<Tag>()
				.HasKey(x => x.Id);

			modelBuilder.Entity<ImageTag>()
				.HasKey(x => new { x.ImageId, x.TagId });

			#endregion

			#region Auto generation

			modelBuilder.Entity<Image>()
				.Property(x => x.Id)
				.ValueGeneratedOnAdd();

			modelBuilder.Entity<Rating>()
				.Property(x => x.Id)
				.ValueGeneratedOnAdd();

			modelBuilder.Entity<Tag>()
				.Property(x => x.Id)
				.ValueGeneratedOnAdd();

			#endregion

			#region Default values

			modelBuilder.Entity<Image>()
				.Property(x => x.Id)
				.HasDefaultValue(1);

			modelBuilder.Entity<Rating>()
				.Property(x => x.Id)
				.HasDefaultValue(1);

			modelBuilder.Entity<Tag>()
				.Property(x => x.Id)
				.HasDefaultValue(1);

			#endregion

			#region Foreign keys

			modelBuilder.Entity<Image>()
				.HasMany(x => x.Wins)
				.WithOne(x => x.Winner)
				.HasForeignKey(x => x.WinnerId);

			modelBuilder.Entity<Image>()
				.HasMany(x => x.Losses)
				.WithOne(x => x.Loser)
				.HasForeignKey(x => x.LoserId);

			modelBuilder.Entity<ImageTag>()
				.HasOne(x => x.Image)
				.WithMany(x => x.ImageTags)
				.HasForeignKey(x => x.ImageId);

			modelBuilder.Entity<ImageTag>()
				.HasOne(x => x.Tag)
				.WithMany(x => x.ImageTags)
				.HasForeignKey(x => x.ImageId);

			#endregion

			#region Rules

			modelBuilder.Entity<Image>()
				.Property(x => x.Added)
				.IsRequired();

			modelBuilder.Entity<Image>()
				.HasIndex(x => x.FileName)
				.IsUnique();

			modelBuilder.Entity<Rating>()
				.Property(x => x.Added)
				.IsRequired();

			modelBuilder.Entity<Tag>()
				.Property(x => x.Added)
				.IsRequired();

			modelBuilder.Entity<ImageTag>()
				.Property(x => x.Added)
				.IsRequired();

			#endregion
		}
	}
}
